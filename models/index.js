var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/my-verb-db");

module.exports.Verb = require("./verb.js");
module.exports.Conjugation = require("./conjugation.js");
module.exports.List = require("./list.js");