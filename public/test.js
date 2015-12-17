//Tried hard-coding base lists.

var erList = {
	name: "Regular ER verbs - Present tense",
	description: "All of the site's regular ER verbs",
	verbs: []
};

var irList = {
	name: "Regular IR verbs - Present tense",
	description: "All of the site's regular IR verbs",
	verbs: []
};

var reList = {
	name: "Regular RE verbs - Present tense",
	description: "All of the site's regular RE verbs",
	verbs: []
};

$.ajax({
	method: "GET",
	url: "/api/verbs",
	success: function (data) {
		data.forEach(function (element) {
			if (element.family === "er" && element.tense.present.irregular === false) {
				console.log(element.infinitive);
				dataToUse._id = element._id;
				dataToUse.infinitive = element.infinitive;
				dataToUse.tense = "present";
				erList.verbs.push(dataToUse);
			} else if (element.family === "ir" && element.tense.present.irregular === false) {
				dataToUse._id = element._id;
				dataToUse.infinitive = element.infinitive;
				dataToUse.tense = "present";
				irList.verbs.push(dataToUse);
			} else if (element.family === "re" && element.tense.present.irregular === false) {
				dataToUse._id = element._id;
				dataToUse.infinitive = element.infinitive;
				dataToUse.tense = "present";
				reList.verbs.push(dataToUse);
			}
		});
		console.log(erList);
		console.log(irList);
		console.log(reList);
	}
});


//Shuffle contents of an array! -- use this for quizzes

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//Conjugation grid

'				<div class="row verb-conjugation" id="' + verb._id + '">' +
	'		          <div class="col-md-6 col-md-offset-3">' +
	'		            <div class="col-md-6 center bottom">' +
	'		              <h1>Je</h1>' +
	'		              <span class="conjugation je">' + verb.tense.present.je + '</span>' +
	'		            </div>' +
	'		            <div class="col-md-6 bottom">' +
	'		              <h1>Nous</h1>' +
	'		              <span class="conjugation nous">' + verb.tense.present.nous + '</span>' +
	'		            </div>' +
	'		            <div class="col-md-6 center bottom">' +
	'		              <h1>Tu</h1>' + 
	'		              <span class="conjugation tu">' + verb.tense.present.tu + '</span>' +
	'		            </div>' +
	'		            <div class="col-md-6 bottom">' +
	'		              <h1>Vous</h1>' +
	'		              <span class="conjugation vous">' + verb.tense.present.vous + '</span>' +
	'		            </div>' +
	'		            <div class="col-md-6 center">' +
	'		              <h1>Il/Elle/On</h1>' +
	'		              <span class="conjugation il">' + verb.tense.present.il + '</span>' +
	'		            </div>' +
	'		            <div class="col-md-6">' +
	'		              <h1>Ils/Elles</h1>' +
	'		              <span class="conjugation ils">' + verb.tense.present.ils + '</span>' +
	'		            </div>' +
	'		          </div>' +
	'		          <div class="col-md-3 button-sidebar">' +
	'					<p>' +
	'		              <button class="btn btn-danger edit-tense edit">Mistake?</button>' +
	'		            </p>' +
						// This button starts out as hidden and will be unhidden on click of the Mistake? button.
	'					<p>' +
	'		              <button class="btn btn-success edit-tense save">Save Changes</button>' +
	'		            </p>' +
	'		            <p>' +
	'		              <button class="btn btn-success tense present">Present</button>' +
	'		            </p>' +
	'		            <p>' +
	'		              <button class="btn btn-primary tense imparfait">Imparfait</button>' +
	'		            </p>' +
	'		          </div>' +
	'		        </div>';