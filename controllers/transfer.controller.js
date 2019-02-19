const db = require("../db");
const shortId = require("shortid");

module.exports.create = function(req, res, next) {
 res.render("transfer/create");
};

module.exports.postCreate = function(req, res, next) {
 let data = {
  id: shortId.generate(),
  amount: parseInt(req.body.amount),
  accountId: req.body.accountId
 }
 db.get("transfers").push(data).write();
 res.redirect("/transfer/create");
};