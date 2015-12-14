$(document).ready(function() {
	console.log("sanity check. JS is working");

	var url;
	var dataToUse = {};
	var id;

	$("input").keydown(function handler(event) {
		if (event.which === 13) {
			// console.log("Hey there");
			var infinitive = $(this).val().toLowerCase();
			var url = "/api/verbname/" + infinitive;
			$.ajax({
				method: "GET",
				url: url,
				success: function (data) {
					//Checks that there is actually information to work with
					if (data.length > 0) {
						$(".search-error").empty();
						renderConjugation(data[0]);
						tense = "present";
					} else {
						$(".search-error").html("Dommage ! Il me semble que ce verbe n'existe pas.<br />Oops! Looks like this verb doesn't exist yet.");
						$("#verbs").empty();
					}
				}
			});
		}
	});

	$("#verbs").on('click', '.present', function (event) {
		console.log("Back to the present");
		id = $(".row.verb-conjugation").attr('id');
		// console.log(id);
		$.ajax({
			method: "GET",
			data: {_id: id},
			url: "/api/verbid/" + id,
			success: function (data) {
				// console.log(data);
				tense = "present";
				$(".je").text(data.tense.present.je);
				$(".tu").text(data.tense.present.tu);
				$(".il").text(data.tense.present.il);
				$(".nous").text(data.tense.present.nous);
				$(".vous").text(data.tense.present.vous);
				$(".ils").text(data.tense.present.ils);
				$(".imparfait").removeClass("btn-success");
				$(".imparfait").addClass("btn-primary");
				$(".present").addClass("btn-success");
			}
		});
	});

	$("#verbs").on('click', '.imparfait', function (event) {
		console.log("Switching to Imparfait");
		id = $(".row.verb-conjugation").attr('id');
		// console.log(id);
		$.ajax({
			method: "GET",
			data: {_id: id},
			url: "/api/verbid/" + id,
			success: function (data) {
				// console.log(data);
				tense = "imparfait";
				$(".je").text(data.tense.imparfait.je);
				$(".tu").text(data.tense.imparfait.tu);
				$(".il").text(data.tense.imparfait.il);
				$(".nous").text(data.tense.imparfait.nous);
				$(".vous").text(data.tense.imparfait.vous);
				$(".ils").text(data.tense.imparfait.ils);
				$(".present").removeClass("btn-success");
				$(".present").addClass("btn-primary");
				$(".imparfait").addClass("btn-success");
			}
		});
	});
});

var tense;

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
	'					<p>' +
	'		              <button class="btn btn-danger correction">Mistake?</button>' +
	'		            </p>' +
	'		            <p>' +
	'		              <button class="btn btn-success present">Present</button>' +
	'		            </p>' +
	'		            <p>' +
	'		              <button class="btn btn-primary imparfait">Imparfait</button>' +
	'		            </p>' +
	'		          </div>' +
	'		        </div>';
	$("#verbs").html(conjugationGridHtml);
}