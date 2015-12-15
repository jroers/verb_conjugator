var mongoose = require("mongoose");
var Verb = mongoose.model('Verb', VerbSchema);

var ListSchema = new mongoose.Schema({
	name: String,
	description: String,
	verbs: [ { type: Schema.Types.ObjectId, ref: 'Verb' } ]
});

var List = mongoose.model('List', ListSchema);
module.exports = List;