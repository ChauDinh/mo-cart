require("dotenv").config();

console.log(process.env.SESSION_SECRET);

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const db = require("./db");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const cartRoute = require("./routes/cart.route");
const transferRoute = require("./routes/transfer.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

const app = express();
const port = 8080;

app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
 let page = parseInt(req.query.page) || 1; 
 let perPage = 10;

 let start = (page-1)*perPage;
 let end = page*perPage;
 res.render('index', {
  products: db.get("products").value().slice(start, end)
 });
});

app.get("/search", (req, res) => {
 let q = req.query.q;
 let page = parseInt(req.query.page) || 1;
 let perPage = 10;

 let start = (page-1)*perPage;
 let end = page*perPage;
 let products = db.get("products").value().slice(start, end);
 let matchedProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })

 res.render('products/index', {
  products: matchedProducts,
  search: q
 })
});

app.get("/:id", (req, res) => {
 let id = req.params.id;
 let product = db.get("products").find({ id: id }).value();
 res.render("product/index", {
  product: product
 });
})

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/transfer", authMiddleware.requireAuth, csurf({ cookie: true }), transferRoute);

app.listen(port, () => console.log(`The app is listening on port ${port}`));

