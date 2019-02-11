const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const shortid = require("shortid");

const db = low(adapter);

// Set defaults - required if JSON file is empty
db.defaults({ users: [], products: [] }).write();


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

app.get("/users", (req, res) => {
 res.render('users/index.pug', {
  users: db.get("users").value()
 })
});

app.get("/products", (req, res) => {
 res.render('products/index.pug', {
  products: db.get("products").value()
 })
});

app.get("/products/search", (req, res) => {
 let q = req.query.q;
 let products = db.get("products").value();
 let matchesProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })

 res.render('products/index', {
  products: matchesProducts
 })
})

app.get("/users/search", (req, res) => {
 let q = req.query.q;
 let users = db.get("users").value();
 let matchedUsers = users.filter(user => {
  return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })
 
 res.render('users/index', {
  users: matchedUsers
 })
});

app.get("/users/create", (req, res) => {
 res.render("users/create")
});

app.get("/products/:id", (req, res) => {
 let id = req.params.id;
 let product = db.get("products").find({ id: id }).value();

 res.render("product/index", {
  product: product
 });
})


app.post("/users/create", (req, res) => {
 req.body.id = shortid.generate();
 db.get("users").push(req.body).write();
 res.redirect("/users");
});


app.listen(port, () => console.log(`The app is listening on port ${port}`));

