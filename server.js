const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
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
 },
 {
  id: 5,
  name: "Dong Ho Nam 1",
  image: "/public/views/products/images/dong-ho-1.jpg"
 }, 
 {
  id: 6,
  name: "Dong Ho Nam 2",
  image: "/public/views/products/images/dong-ho-2.png"
 },
 {
  id: 7,
  name: "Iphone X 64GB",
  image: "/public/views/products/images/ipX-64.png"
 },
 {
  id: 8,
  name: "Iphone X 128GB",
  image: "/public/views/products/images/ipx-128.png"
 },
 {
  id: 9,
  name: "Iphone 7 Plus 32/64GB",
  image: "/public/views/products/images/ip7-plus.png"
 },
 {
  id: 10,
  name: "Ao So Mi Nam 1",
  image: "/public/views/products/images/so-mi-nam-1.jpg"
 },
 {
  id: 11,
  name: "Ao So Mi Nam 2",
  image: "/public/views/products/images/so-mi-nam-2.jpg"
 },
 {
  id: 12,
  name: "Ao So Mi Nu 1",
  image: "/public/views/products/images/so-mi-nu-1.jpg"
 },
 {
  id: 13,
  name: "Ao So Mi Nu 2",
  image: "/public/views/products/images/so-mi-nu-2.jpg"
 }
];

app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
 res.render("users/create")
});

app.post("/users/create", (req, res) => {
 users.push(req.body);
 res.redirect("/users");
});

app.listen(port, () => console.log(`The app is listening on port ${port}`));

