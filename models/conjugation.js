var mongoose = require("mongoose");

var ConjugationSchema = new mongoose.Schema({
	je: String,
	tu: String,
	il: String,
	nous: String,
	vous: String,
	ils: String,
	irregular: Boolean
});

var Conjugation = mongoose.model('Conjugation', ConjugationSchema);
module.exports = Conjugation;