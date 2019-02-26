const md5 = require("md5");
const db = require("../db");

module.exports.login = function(req, res, next) {
 res.render("userAuth/login");
};

module.exports.postLogin = function(req, res) {
 let email = req.body.email;
 let password = req.body.password;

 let user = db.get("users").find({ email: email }).value();

 if (!user) {
  res.render("userAuth/login", {
   errors: [
    'Users does not exist'
   ],
   values: req.body
  });
  return;
 }

 const hashedPassword = md5(password);

 if (user.password !== hashedPassword) {
  res.render("userAuth/login", {
   errors: [
    "Opps...Somwthing went wrong!"
   ],
   values: req.body
  });
  return;
 }
 
 res.cookie("userId", user.id, {
  signed: true
 });
 res.redirect("/");
};