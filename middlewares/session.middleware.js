const shortId = require("shortid");
const db = require("../db");

module.exports = function(req, res, next) {

 if (!req.signedCookies.sessionId) {
  let sessionId = shortId.generate();
  res.cookie("sessionId", sessionId, {
   signed: true
  });

  db.get("sessions").push({
   id: sessionId
  }).write();
 }
 
 let sessionSignedId = req.signedCookies.sessionId;

 let productNumber = db.get("sessions").find({ id: sessionSignedId }).get("cart").size().value();
 res.locals.productNumber = productNumber;

 // let productIdArray = Object.keys(db.get("sessions").find({ id: sessionSignedId }).get("cart").value());
 // res.locals.productIdArray = productIdArray;
 
 // let productNameArray = [];
 // for (let i = 0; i < productIdArray.length; i++) {
 //  productNameArray += Array.from(db.get("products").find({ id: productIdArray[i] }).get("name").value());
 // }
 // res.locals.productNameArray = productNameArray;

 // let productNumberArray = Object.values(db.get("sessions").find({ id: sessionSignedId }).get("cart").value());
 // res.locals.productNumberArray = productNumberArray;

 next();
};
