$(document).ready(function() {
	console.log("sanity check. JS is working");

	var url;
	var dataToUse = {};

	$(".btn-primary").click(function handler() {
		var infinitive = $(this).text().toLowerCase();
		url = "/api/verbs/" + infinitive;
		$.ajax({
			method: "GET",
			url: url,
			success: function (data) {
				console.log(data);
				je = data.tense.present.je;
				tu = data.tense.present.tu;
				il = data.tense.present.il;
				nous = data.tense.present.nous;
				vous = data.tense.present.vous;
				ils = data.tense.present.ils;
				$(".conjugation.je").text(je);
				$(".conjugation.tu").text(tu);
				$(".conjugation.il").text(il);
				$(".conjugation.nous").text(nous);
				$(".conjugation.vous").text(vous);
				$(".conjugation.ils").text(ils);
			}
		});
	});
});