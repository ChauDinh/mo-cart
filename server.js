const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

const users = [
 { id: 1, name: "Chau" },
 { id: 2, name: "Leslie" }
];

const products = [
 {
  id: 1,
  name: "Quan Lot Nu The Thao",
  image: "/public/views/products/images/qlntt.jpg"
 },
 {
  id: 2,
  name: "Quan Lot Nu",
  image: "/public/views/products/images/qln.png"
 },
 {
  id: 3,
  name: "Quan Lot Nam",
  image: "/public/views/products/images/qln.jpg"
 },
 {
  id: 4,
  name: "Quan Lot Nam Ren",
  image: "/public/views/products/images/qlnr.jpg"
 }
];

app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
 res.render('index', {
  products: products
 });
});

app.get("/search", (req, res) => {
 let q = req.query.q;
 let matchedProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })

 res.render('products/index', {
  products: matchedProducts
 })
});

app.get("/users", (req, res) => {
 res.render('users/index.pug', {
  users: users
 })
});

app.get("/products", (req, res) => {
 res.render('products/index.pug', {
  products: products
 })
});

app.get("/products/search", (req, res) => {
 let q = req.query.q;
 let matchesProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })

 res.render('products/index', {
  products: matchesProducts
 })
})

app.get("/users/search", (req, res) => {
 let q = req.query.q;
 let matchedUsers = users.filter(user => {
  return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })
 
 res.render('users/index', {
  users: matchedUsers
 })
});

app.get("/users/create", (req, res) => {
 res.render("users/create", {
  users
 })
})

app.listen(port, () => console.log(`The app is listening on port ${port}`));

