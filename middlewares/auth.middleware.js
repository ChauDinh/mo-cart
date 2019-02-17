const db = require("../db");

module.exports.requireAuth = function(req, res, next) {
	console.log(req.signedCookies, req.cookies);
 if (!req.signedCookies.userId) {
 	res.redirect("/auth/login");
 	return;
 }

 let user = db.get("users").find({ id: req.signedCookies.userId }).value();

 if (!user) {
 	res.redirect("/auth/login");
 	return;
	}
	
	res.locals.user = user;

 next();
};