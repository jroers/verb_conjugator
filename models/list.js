var mongoose = require("mongoose");

var ListSchema = new mongoose.Schema({
	name: String,
	description: String,
	verbs: Array
});

var List = mongoose.model('List', ListSchema);
module.exports = List;