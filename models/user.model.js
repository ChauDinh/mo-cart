const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 email: String,
 password: String,
 name: String,
 phone: String,
 avatar: String,
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;