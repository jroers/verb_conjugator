// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var mongoose = require("mongoose");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var db = require("./models");

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/verbs', function verbList (req, res) {
	db.Verb.find({}, function (err, success) {
		if (err) { return console.log(err); }
		res.send(success);
	});
});


// searching by infinitive
app.get('/api/verbname/:infinitive', function verbList (req, res) {
	// console.log(req.params);
	db.Verb.find(req.params, function (err, success) {
		if (err) { return console.log(err); }
		res.send(success);
	});
});

//searching by infinitive ID
app.get('/api/verbid/:_id', function verbList (req, res) {
	// console.log(req.params);
	db.Verb.findById(req.params, function (err, success) {
		if (err) { return console.log(err); }
		res.send(success);
	});
});

 // listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});