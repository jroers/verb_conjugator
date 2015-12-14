$(document).ready(function() {
	console.log("sanity check. JS is working");

	var url;
	var dataToUse = {};
	var id;

	$("input").keydown(function handler(event) {
		if (event.which === 13) {
			// console.log("Hey there");
			var infinitive = $(this).val().toLowerCase();
			var family = infinitive.slice(infinitive.length-2, infinitive.length);
			if (family === "er" || family === "re" || family === "ir") {
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
					},
					error: function (error) {
						console.log("search error: ", error);
						$("#verbs").empty();
						$(".search-error").html("Search currently unavailable.");
					}
				});
			} else {
				$("#verbs").empty();
				$(".search-error").html("Euh, je ne crois pas que ce soit un verbe.<br />Please type a valid infinitive.");
			}
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
				$(".tense").removeClass("btn-success");
				$(".tense").addClass("btn-primary");
				$(".present").addClass("btn-success");
			},
			error: function (error) {
				console.log("Present tense error: ", error);
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
				$(".tense").removeClass("btn-success");
				$(".tense").addClass("btn-primary");
				$(".imparfait").addClass("btn-success");
			},
			error: function (error) {
				console.log("Imparfait tense error: ", error);
			}
		});
	});

	$("#verbs").on('click', '.edit-tense.edit', function (event) {
		$(".edit-tense.save").show();
		$(".edit-tense.edit").hide();
		var je = $(".je").text();
		var tu = $(".tu").text();
		var il = $(".il").text();
		var nous = $(".nous").text();
		var vous = $(".vous").text();
		var ils = $(".ils").text();
		$(".je").html("<input type='text' class='je'>");
		$("input.je").val(je);
		$(".tu").html("<input type='text' class='tu'>");
		$("input.tu").val(tu);
		$(".il").html("<input type='text' class='il'>");
		$("input.il").val(il);
		$(".nous").html("<input type='text' class='nous'>");
		$("input.nous").val(nous);
		$(".vous").html("<input type='text' class='vous'>");
		$("input.vous").val(vous);
		$(".ils").html("<input type='text' class='ils'>");
		$("input.ils").val(ils);

		//After changing the contents, use this: $("span.nous").html($("input.nous").val());
		// That will take the value of the text box and put it into the span in lieu of an input box.
	});

	$("#verbs").on('click', '.edit-tense.save', function (event) {
		$(".edit-tense.edit").show();
		$(".edit-tense.save").hide();
		id = $(".row.verb-conjugation").attr('id');
		var je = $("input.je").val();
		var tu = $("input.tu").val();
		var il = $("input.il").val();
		var nous = $("input.nous").val();
		var vous = $("input.vous").val();
		var ils = $("input.ils").val();
		dataToUse.tense = tense;
		dataToUse.je = je;
		dataToUse.tu = tu;
		dataToUse.il = il;
		dataToUse.nous = nous;
		dataToUse.vous = vous;
		dataToUse.ils = ils;
		$.ajax({
			method: "PUT",
			url: "/api/verbid/" + id,
			data: dataToUse,
			success: function (data) {
				console.log(data);
			},
			error: function (error) {
				console.log(error);
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
	$("#verbs").html(conjugationGridHtml);
	$(".edit-tense.save").hide();
}