const shortId = require("shortid");
const db = require("../db");

module.exports = function(req, res, next) {

 if (!req.signedCookies.sessionId) {
  let sessionId = shortId.generate()
  res.cookie("sessionId", sessionId, {
   signed: true
  });

  db.get("sessions").push({
   id: sessionId
  }).write();
 }
 
 let sessionId = req.signedCookies.sessionId;

 let countCart = db.get("sessions").find({ id: sessionId }).get("cart").size().value();
 res.locals.countCart = countCart;

 let productIdArray = Object.keys(db.get("sessions").find({ id: sessionId }).get("cart").value());
 res.locals.productIdArray = productIdArray;
 
 let productNameArray = [];
 for (let i = 0; i < productIdArray.length; i++) {
  productNameArray += Array.from(db.get("products").find({ id: productIdArray[i] }).get("name").value());
 }
 res.locals.productNameArray = productNameArray;

 let productNumberArray = Object.values(db.get("sessions").find({ id: sessionId }).get("cart").value());
 res.locals.productNumberArray = productNumberArray;

 next();
};