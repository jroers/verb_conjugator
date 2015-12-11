var mongoose = require("mongoose");
var Conjugation = require("./conjugation.js");

var VerbSchema = new mongoose.Schema({
	infinitive: String,
	family: String,
	tense: {
		present: Conjugation.schema,
		imparfait: Conjugation.schema
	}
});

var Verb = mongoose.model('Verb', VerbSchema);
module.exports = Verb;