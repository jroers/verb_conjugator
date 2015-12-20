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

app.get('/lists', function homepage (req, res) {
  res.sendFile(__dirname + '/views/lists/index.html');
});

/*
 * JSON API Endpoints - main page
 */

app.get('/api/verbs', function verbList (req, res) {
	db.Verb.find({}, function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});

app.post('/api/verbs', function newVerb (req, res) {
	db.Verb.create(req.body, function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});


// searching by infinitive
app.get('/api/verbname/:infinitive', function verbList (req, res) {
	db.Verb.find(req.params, function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});

//searching by infinitive ID
app.get('/api/verbid/:_id', function verbList (req, res) {
	db.Verb.findById(req.params, function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});

app.put('/api/verbid/:_id', function updateVerb (req, res) {
	db.Verb.findById(req.params, function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		var selectedTense = req.body.tense;
		var updatedVerb = success;
		//Checks to see whether anything has actually been changed. If there is a difference, it will save it.
		if (updatedVerb.tense[selectedTense].je !== req.body.je) { updatedVerb.tense[selectedTense].je = req.body.je; }
		if (updatedVerb.tense[selectedTense].tu !== req.body.tu) { updatedVerb.tense[selectedTense].tu = req.body.tu; }
		if (updatedVerb.tense[selectedTense].il !== req.body.il) { updatedVerb.tense[selectedTense].il = req.body.il; }
		if (updatedVerb.tense[selectedTense].nous !== req.body.nous) { updatedVerb.tense[selectedTense].nous = req.body.nous; }
		if (updatedVerb.tense[selectedTense].vous !== req.body.vous) { updatedVerb.tense[selectedTense].vous = req.body.vous; }
		if (updatedVerb.tense[selectedTense].ils !== req.body.ils) { updatedVerb.tense[selectedTense].ils = req.body.ils; }
		updatedVerb.save(function (err, savedVerb) {
			res.send(updatedVerb);
		});
	});
});

/*
 * JSON API Endpoints - List page
 */

app.get('/api/list', function listsList (req, res) {
	db.List.find({}).populate('verbs').exec(function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});

app.get('/api/list/:_id', function getListData (req, res) {
	db.List.findById(req.params._id).populate('verbs').exec(function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});

app.put('/api/list/:_id', function updateListData (req, res) {
  // http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
  db.List.findOneAndUpdate({_id: req.params._id}, req.body, function (err, updatedList) {
    if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(updatedList);
	});
});

app.post('/api/list', function newList (req, res) {
	db.List.create(req.body, function (err, success) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send(success);
	});
});

app.delete('/api/list/:_id', function removeList (req, res) {
	db.List.remove(req.params, function (err) {
		if (err) {
      console.log(err)
      return res.status(404).json({errors: ["Bad Thing", err.message]})
    }
		res.send("List deleted.");
	});
});

 // listen on port 3000
app.listen(process.env.PORT || 3000);
