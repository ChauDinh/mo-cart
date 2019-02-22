const db = require("../db");

module.exports.addToCart = function(req, res, next) {
 let productId = req.params.productId;
 let sessionId = req.signedCookies.sessionId;

 if (!sessionId) {
  res.redirect("/");
  return;
 }

 let countCart = db
 .get("sessions")
 .find({ id: sessionId })
 .get("cart." + productId, 0)
 .value();

 db
 .get("sessions")
 .find({ id: sessionId })
 .set("cart." + productId, countCart + 1)
 .write();

 // let page = parseInt(req.query.page) || 1;
 // let perPage = 6;

 // let start = (page-1)*perPage;
 // let end = page*perPage;

 res.redirect("/");

 // let productNumber = db.get("sessions").find({ id: sessionId }).size().value();

 // res.locals.productNumber = productNumber;
};
