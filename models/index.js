var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my-verb-db");

module.exports.Verb = require("./verb.js");
module.exports.Conjugation = require("./conjugation.js");
module.exports.List = require("./list.js");