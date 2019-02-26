const db = require("../db");

module.exports.server = function(req, res) {
 let page = parseInt(req.query.page) || 1;
 let perPage = 6;

 let start = (page-1)*perPage;
 let end = page*perPage;
 res.render('products/index.pug', {
  products: db.get("products").value().slice(start, end)
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

module.exports.get = function(req, res, next) {
 let id = req.params.id;
 let product = db.get("products").find({ id: id }).value();
 
 res.render("product/index", {
  product: product
 });

 next();
};