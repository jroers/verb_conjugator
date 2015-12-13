$(document).ready(function() {
	console.log("sanity check. JS is working");

	var url;
	var dataToUse = {};

	$("input").keydown(function handler(event) {
		if (event.which === 13) {
			console.log("Hey there");
			// var infinitive = $(this).val().toLowerCase();
			// url = "/api/verbs/" + infinitive;
			// $.ajax({
			// 	method: "GET",
			// 	url: url,
			// 	success: function (data) {
			// 		console.log(data);
			// 		// je = data.tense.present.je;
			// 		// tu = data.tense.present.tu;
			// 		// il = data.tense.present.il;
			// 		// nous = data.tense.present.nous;
			// 		// vous = data.tense.present.vous;
			// 		// ils = data.tense.present.ils;
			// 		// $(".conjugation.je").text(je);
			// 		// $(".conjugation.tu").text(tu);
			// 		// $(".conjugation.il").text(il);
			// 		// $(".conjugation.nous").text(nous);
			// 		// $(".conjugation.vous").text(vous);
			// 		// $(".conjugation.ils").text(ils);
			// 		renderConjugation(data);
			// 	}
			// });
		}
		
	});
});

function renderConjugation(verb) {
	if ($(".verb-conjugation")) {
		$(".verb-conjugation").empty();
	}
	var conjugationGridHtml = 
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
	'		            <p>' +
	'		              <button class="btn btn-danger">Present</button>' +
	'		            </p>' +
	'		            <p>' +
	'		              <button class="btn btn-danger">Imparfait</button>' +
	'		            </p>' +
	'		          </div>' +
	'		        </div>';
	$("#verbs").html(conjugationGridHtml);
}