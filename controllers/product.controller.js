const db = require("../db");

module.exports.server = function(req, res) {
 res.render('products/index.pug', {
  products: db.get("products").value()
 });
};

module.exports.search = function(req, res) {
 let q = req.query.q;
 let products = db.get("products").value();
 let matchesProducts = products.filter(product => {
  return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 });

 res.render('products/index', {
  products: matchesProducts,
  search: q
 });
};

module.exports.get = function(req, res) {
 let id = parseInt(req.params.id);
 let product = db.get("products").find({ id: id }).value();
 
 res.render("product/index", {
  product: product
 });
};