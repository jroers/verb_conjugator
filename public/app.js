$(document).ready(function() {
	console.log("sanity check. JS is working");

	var url;
	var dataToUse = {};
	var id;

	$("input.verb-search").keydown(function handler(event) {
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
							$(".search-error").html("Dommage ! Il me semble que ce verbe n'existe pas.<br />" +
								"Oops! Looks like this verb doesn't exist yet.<br />" +
								"<button class='btn btn-primary new-verb'>Create?</button>");
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
				$("span.je").html(je);
				$("span.tu").html(tu);
				$("span.il").html(il);
				$("span.nous").html(nous);
				$("span.vous").html(vous);
				$("span.ils").html(ils);
			},
			error: function (error) {
				console.log(error);
			}
		});
	});

	$(".search-error").on('click', 'button.new-verb', function (event) {
		console.log("new verb click");
		var infinitive = $("input.verb-search").val().toLowerCase();
		var family = infinitive.slice(infinitive.length-2, infinitive.length);
		var stem = infinitive.slice(0, infinitive.length-2);
		$(".modal-title .new-infinitive").text(infinitive);
		$(".irregular-flag").prop('checked', false);
		$("#newVerbModal").modal("show");
		if (family === "er") {
			$(".new-verb.je").val(stem + "e");
			$(".new-verb.tu").val(stem + "es");
			$(".new-verb.il").val(stem + "e");
			$(".new-verb.nous").val(stem + "ons");
			$(".new-verb.vous").val(stem + "ez");
			$(".new-verb.ils").val(stem + "ent");
		} else if (family === "re") {
			$(".new-verb.je").val(stem + "s");
			$(".new-verb.tu").val(stem + "s");
			$(".new-verb.il").val(stem);
			$(".new-verb.nous").val(stem + "ons");
			$(".new-verb.vous").val(stem + "ez");
			$(".new-verb.ils").val(stem + "ent");
		} else if (family === "ir") {
			$(".new-verb.je").val(stem + "is");
			$(".new-verb.tu").val(stem + "is");
			$(".new-verb.il").val(stem + "it");
			$(".new-verb.nous").val(stem + "issons");
			$(".new-verb.vous").val(stem + "issez");
			$(".new-verb.ils").val(stem + "issent");
		}
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