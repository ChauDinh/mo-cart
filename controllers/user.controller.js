const db = require("../db");
const md5 = require("md5");
const shortid = require("shortid");

module.exports.server = function(req, res) {
 res.render('users/index', {
  users: db.get("users").value()
 });
};

module.exports.search = function(req, res) {
 let q = req.query.q;
 let users = db.get("users").value();
 let matchedUsers = users.filter(user => {
  return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 });
 
 res.render('users/index', {
  users: matchedUsers,
  values: q
 });
};

module.exports.create = function(req, res) {
 console.log(req.cookies);
 res.render("users/create");
};

module.exports.get = function(req, res) {
 let id = req.params.id;
 let user = db.get("users").find({ id: id }).value();

 res.render("user/index", {
  user: user
 });
};

module.exports.postCreate = function(req, res) {
 req.body.id = shortid.generate();
 req.body.password = md5(req.body.password);
 
 console.log(res.locals);
 // req.body.avatar = req.file.path.split("/").slice(1).join("/");

 // Push to database
 db.get("users").push(req.body).write();
 res.redirect("/");
};