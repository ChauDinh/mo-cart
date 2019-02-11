const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./db");

const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");


const app = express();
const port = 8080;

app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
 res.render('index', {
  products: db.get("products").value()
 });
});

app.get("/search", (req, res) => {
 let q = req.query.q;
 let products = db.get("products").value();
 let matchedProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })

 res.render('products/index', {
  products: matchedProducts
 })
});

app.use("/products", productRoute);
app.use("/users", userRoute);

app.listen(port, () => console.log(`The app is listening on port ${port}`));

