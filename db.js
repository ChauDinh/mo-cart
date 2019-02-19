const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");

db = low(adapter);

// Set defaults - required if JSON file is empty
db.defaults({ users: [], products: [], sessions: [], transfers: [] }).write();

module.exports = db;