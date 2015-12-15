var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Verb = require("./verb.js");

var ListSchema = new mongoose.Schema({
	name: String,
	description: String,
	verbs: [ { type: Schema.Types.ObjectId, ref: 'Verb' } ]
});

var List = mongoose.model('List', ListSchema);
module.exports = List;