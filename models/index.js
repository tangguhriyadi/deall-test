const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

//models
db.Users = require("./users.model.js")(mongoose);

module.exports = db;
