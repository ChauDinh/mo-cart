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

 let productIdArray = Object.keys(db.get("sessions").find({ id: sessionSignedId }).get("cart").value() || []);
 res.locals.productIdArray = productIdArray;
 
 let productNameArray = [];
 productIdArray.forEach(element => {
  productNameArray.push(db.get("products").find({ id: element }).get("name").value() || "");
 });
 res.locals.productNameArray = productNameArray;

 let productNumberArray = Object.values(db.get("sessions").find({ id: sessionSignedId }).get("cart").value() || "");
 res.locals.productNumberArray = productNumberArray;

 let count = 0;
 productNumberArray.forEach(element => {
  count = count + parseInt(element);
 })
 res.locals.count = count;

 next();
};
