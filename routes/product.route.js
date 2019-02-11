const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
 res.render('products/index.pug', {
  products: db.get("products").value()
 })
});

router.get("/search", (req, res) => {
 let q = req.query.q;
 let products = db.get("products").value();
 let matchesProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })

 res.render('products/index', {
  products: matchesProducts
 })
});

router.get("/:id", (req, res) => {
 let id = parseInt(req.params.id);
 let product = db.get("products").find({ id: id }).value();
 
 res.render("product/index", {
  product: product
 });
});

module.exports = router;