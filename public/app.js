//GLOBAL VARIABLES
//Functions are at the bottom.

var editListModalButtonHtml = 
'<div class="col-md-12 addVerb">' +
'  <button class="btn btn-success" id="addVerb">Add another verb</button>' +
'</div>';

var tense;
var url;
var dataToUse = {};
var id;
var tenseChangePrevent = 0;
var tenseCount = 0;


//update this variable with the maxiumum number of tenses stored.
var tenseMax = 2;

var dropDownContents;

$(document).ready(function() {

	console.log("sanity check. JS is working");

	/*
	*		TABLE OF CONTENTS:
	*		1. MAIN (SEARCH) PAGE JS
	*			a. Searching for a verb
	*			b. Switching to the present tense
	*			c. Switching to the imparfait tense
	*			d. Edit current tense button
	*			e. Save current edits button
	*			f. Create verb modal button
	*			g. Save current tense of creation modal
	*			h. Next tense of creation modal
	*			i. Save created verb button
	*		2. LIST PAGE JS
	*			a. Function for rendering list data to page
	*			b. Call to populate multi-select field
	*			c. Handling submission of a new list
	*			d. Handling deletion of an existing list
	* 			e. Handling editing of existing list
	*			f. Adding a new verb to an existing list
	*			g. Canceling the addition of a new verb
	*			h. Adding the verb selected from a drop down
	*			i. Removing a pre-existing verb from a list
	*			j. Saving the updated list data
	*/

	// 1. MAIN PAGE JS:
	if ($("#main-page").length >= 1) {
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
					$(".search-error").html("Euh, je ne crois pas que ce soit un verbe." +
						"<br />Please type a valid infinitive.");
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
			$("input.verb-search").hide();
			$(".edit-tense.save").show();
			$(".edit-tense.edit").hide();
			$(".imparfait").hide();
			$(".present").hide();
			tenseChangePrevent = 1;
			var je = $("span.conjugation.je").text();
			var tu = $("span.conjugation.tu").text();
			var il = $("span.conjugation.il").text();
			var nous = $("span.conjugation.nous").text();
			var vous = $("span.conjugation.vous").text();
			var ils = $("span.conjugation.ils").text();
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
			$("input.verb-search").show();
			$(".edit-tense.edit").show();
			$(".edit-tense.save").hide();
			$(".imparfait").show();
			$(".present").show();
			tenseChangePrevent = 0;
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
			tense = "present";
			$("span.new-verb.je").html("<input class='new-verb je'>");
			$("span.new-verb.tu").html("<input class='new-verb tu'>");
			$("span.new-verb.il").html("<input class='new-verb il'>");
			$("span.new-verb.nous").html("<input class='new-verb nous'>");
			$("span.new-verb.vous").html("<input class='new-verb vous'>");
			$("span.new-verb.ils").html("<input class='new-verb ils'>");
			tenseCount = 1;
			tenseChecker(tenseCount);
			var infinitive = $("input.verb-search").val().toLowerCase();
			var family = infinitive.slice(infinitive.length-2, infinitive.length);
			var stem = infinitive.slice(0, infinitive.length-2);

			dataToUse.infinitive = infinitive;
			dataToUse.family = family;
			dataToUse.tense = {};

			$(".modal-title .new-infinitive").text(infinitive);
			$(".irregular-flag").prop('checked', false);

			//hiding buttons that are currently unnecessary
			$(".save-tense").show();
			$(".next-tense").hide();
			$("#createVerb").hide();
			$("#newVerbModal").modal("show");
			//Applies the appropriate logic to verbs depending on their family.
			conjugateVerb(infinitive, tenseChecker(tenseCount));
		});

		$(".save-tense").click(function (event) {
			//hides the save button and displays appropriate buttons to cycle between tense editors.
			$(".save-tense").hide();
			newVerbButtonCheck(tenseCount);
			tenseChecker(tenseCount);
			if (tenseCount === tenseMax) {
				$("#createVerb").show();
			}

			var je = $("input.new-verb.je").val();
			var tu = $("input.new-verb.tu").val();
			var il = $("input.new-verb.il").val();
			var nous = $("input.new-verb.nous").val();
			var vous = $("input.new-verb.vous").val();
			var ils = $("input.new-verb.ils").val();
			dataToUse.tense[tense] = {};
			dataToUse.tense[tense].je = je;
			dataToUse.tense[tense].tu = tu;
			dataToUse.tense[tense].il = il;
			dataToUse.tense[tense].nous = nous;
			dataToUse.tense[tense].vous = vous;
			dataToUse.tense[tense].ils = ils;
			dataToUse.tense[tense].irregular = $(".irregular-flag").prop('checked');
			// console.log(dataToUse);
			$("span.new-verb.je").html(je);
			$("span.new-verb.tu").html(tu);
			$("span.new-verb.il").html(il);
			$("span.new-verb.nous").html(nous);
			$("span.new-verb.vous").html(vous);
			$("span.new-verb.ils").html(ils);
		});
		
		$(".next-tense").click(function (event) {
			$(".save-tense").show();
			$(".next-tense").hide();
			$("span.new-verb.je").html("<input class='new-verb je'>");
			$("span.new-verb.tu").html("<input class='new-verb tu'>");
			$("span.new-verb.il").html("<input class='new-verb il'>");
			$("span.new-verb.nous").html("<input class='new-verb nous'>");
			$("span.new-verb.vous").html("<input class='new-verb vous'>");
			$("span.new-verb.ils").html("<input class='new-verb ils'>");
			tenseCount ++;
			$(".tense-progress").text(tenseCount);
			var infinitive = $(".new-infinitive").text();
			conjugateVerb(infinitive, tenseChecker(tenseCount));
		});

		$("#createVerb").click(function () {
			url = "/api/verbs";
			$.ajax({
				method: "POST",
				url: url,
				data: dataToUse,
				success: function (data) {
					$(".search-error").empty();
					$("#newVerbModal").modal("hide");

					renderConjugation(data);
				}
			});
		});
	}










	// 2. LIST PAGE JS:

	function getLists() {
		$.ajax({
			method: 'GET',
			url: '/api/list',
			success: function (data) {
				data.forEach(function (element) {
					renderListData(element);
				});
			}
		});
	}

	if ($("#list-page").length >= 1) {
		dataToUse = {};
		//Gets all of the infinitives for the multi-select menu on page load
		$.ajax({
			method: "GET",
			url: '/api/verbs',
			success: function (data) {
				//Sorts the array in alphabetical order of infinitives for easier drop-down menu selection
				data.sort(function(a, b) {
				  	if (a.infinitive < b.infinitive) {
				  		return -1;
				 	} else if (a.infinitive > b.infinitive) {
				    	return 1;
				  	} else  {
				     	return 0;
				  	}
				});
				dropDownContents = data;
				data.forEach(function (element) {
					$(".verbs").append("<option value='" + element._id + "''>" + element.infinitive + "</option>");
				});
			}
		});

		//Gets all of the list information on page load
		getLists();
			

		$("#newList").submit(function (event) {
			event.preventDefault();
			var data = $(this).serialize();
			$.ajax({
				method: "POST",
				url: "/api/list",
				data: data,
				success: function (data) {
					$("#lists").empty();
					getLists();
					$("#newList").trigger("reset");
				}
			});
		});

		$("#lists").on("click", ".delete-list", function (event) {
			var listId = $(this).parents(".row").attr("id");
			$.ajax({
				method: "DELETE",
				url: "/api/list/" + listId,
				success: function (data) {
					$("#lists").empty();
					getLists();
				}
			});
		});

		$("#lists").on("click", ".edit-list", function (event) {
			var listId = $(this).parents(".row").attr("id");
			$("#editListModal").data("list-id", listId);
			$(".modal-body.part2 fieldset").empty();
			$("#editListModal").modal("show");
			$.ajax({
				method: 'GET',
				url: "/api/list/" + listId,
				success: function (data) {
					$("#editName").val(data.name);
					$("#editDescription").val(data.description);
					data.verbs.forEach(function (element) {
						listOfVerbsToEdit(element);
					});
					$(".modal-body.part2 fieldset").append(editListModalButtonHtml);

				}
			});
		});

		$("#editListModal").on("click", "#addVerb", function () {
			//Removes the #addVerb button. It will be re-added to 
			//the bottom of the modal once a new verb has been added.
			$(".addVerb").remove();
			//Calls a function that adds a dropdown that is populated with the verbs
			//that populated the initial multi-select field.
			renderVerbDropDownMenu();
		});

		$("#editListModal").on("click", ".cancel-addition", function () {
			$(".drop-down").remove();
			$(".modal-body.part2 fieldset").append(editListModalButtonHtml);
		});

		$("#editListModal").on("click", ".verb-addition", function () {
			var verbId = $(".drop-down select").val();
			$.ajax({
				method: 'GET',
				url: '/api/verbid/' + verbId,
				success: function (data) {
					listOfVerbsToEdit(data);
					$(".drop-down").remove();
					$(".modal-body.part2 fieldset").append(editListModalButtonHtml);
				}
			});
		});

		$("#editListModal").on("click", ".delete-verb", function () {
			var id = $(this).parents('.edit-verb-list').attr('id');
			$("#" + id).remove();
		});

		$("#createVerb").click(function () {
			var listId = $("#editListModal").data("list-id");
			var verbIds = [];
			$(".edit-verb-list").each(function () {
				verbIds.push($(this).attr('id'));
			});
			dataToUse.name = $("#editName").val();
			dataToUse.description = $("#editDescription").val();
			dataToUse.verbs = verbIds;
			$.ajax({
				method: 'PUT',
				url: "/api/list/" + listId,
				data: dataToUse,
				success: function (data){
					$("#editListModal").modal("hide");
					$("#lists").empty();
					getLists();
				}
			});
		});
	}
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

//This function will be used in the POST for new verbs.
//It will store information for the appropriate tense in the appropriate category.
function tenseChecker(tenseCount) {
	if (tenseCount === 1) {
		tense = "present";
		$(".current-tense").text(tense);
		return tense;
	} else if (tenseCount === 2) {
		tense = "imparfait";
		$(".current-tense").text(tense);
		return tense;
	}
}

//This function will need to be updated as more tenses are added.
function conjugateVerb(infinitive, tense) {
	var family = infinitive.slice(infinitive.length-2, infinitive.length);
	var stem = infinitive.slice(0, infinitive.length-2);
	if (tense === "present") {
		if (family === "er") {
			$("input.new-verb.je").val(stem + "e");
			$("input.new-verb.tu").val(stem + "es");
			$("input.new-verb.il").val(stem + "e");
			$("input.new-verb.nous").val(stem + "ons");
			$("input.new-verb.vous").val(stem + "ez");
			$("input.new-verb.ils").val(stem + "ent");
		
		} else if (family === "re") {
			$("input.new-verb.je").val(stem + "s");
			$("input.new-verb.tu").val(stem + "s");
			$("input.new-verb.il").val(stem);
			$("input.new-verb.nous").val(stem + "ons");
			$("input.new-verb.vous").val(stem + "ez");
			$("input.new-verb.ils").val(stem + "ent");
		
		} else if (family === "ir") {
			$("input.new-verb.je").val(stem + "is");
			$("input.new-verb.tu").val(stem + "is");
			$("input.new-verb.il").val(stem + "it");
			$("input.new-verb.nous").val(stem + "issons");
			$("input.new-verb.vous").val(stem + "issez");
			$("input.new-verb.ils").val(stem + "issent");
		}
	} else if (tense === "imparfait") {
		if (infinitive === "être" || infinitive === "etre") {
			$("input.new-verb.je").val("étais");
			$("input.new-verb.tu").val("étais");
			$("input.new-verb.il").val("était");
			$("input.new-verb.nous").val("étions");
			$("input.new-verb.vous").val("étiez");
			$("input.new-verb.ils").val("étaient");
			$(".irregular-flag").prop('checked', true);
		} else {
			if (family === "er") {
				$("input.new-verb.je").val(stem + "ais");
				$("input.new-verb.tu").val(stem + "ais");
				$("input.new-verb.il").val(stem + "ait");
				$("input.new-verb.nous").val(stem + "ions");
				$("input.new-verb.vous").val(stem + "iez");
				$("input.new-verb.ils").val(stem + "aient");
			
			} else if (family === "re") {
				$("input.new-verb.je").val(stem + "ais");
				$("input.new-verb.tu").val(stem + "ais");
				$("input.new-verb.il").val(stem + "ait");
				$("input.new-verb.nous").val(stem + "ions");
				$("input.new-verb.vous").val(stem + "iez");
				$("input.new-verb.ils").val(stem + "aient");
			
			} else if (family === "ir") {
				$("input.new-verb.je").val(stem + "issais");
				$("input.new-verb.tu").val(stem + "issais");
				$("input.new-verb.il").val(stem + "issait");
				$("input.new-verb.nous").val(stem + "issions");
				$("input.new-verb.vous").val(stem + "issiez");
				$("input.new-verb.ils").val(stem + "issaient");
			}
		}
	}
}

function newVerbButtonCheck(tenseCount) {
	if (tenseCount > 1 ) {
		if (tenseCount < tenseMax) {
			$(".next-tense").show();
		}
	} else if (tenseCount === 1) {
		$(".next-tense").show();
	}
}

function renderListData(list) {
	var listHtml = 
        "<div class='row list' id='" + list._id + "'>" +
        "  <div class='col-md-10 col-md-offset-1'>" +
        "    <div class='panel panel-default'>" +
        "      <div class='panel-body'>" +
        "        <div class='row'>" +
        "          <ul class='list-group'>" +
        "            <div class='list-group-item'>" +
        "              <h3 class='inline-header'>Name: </h3>" +
        "              <span class='name'>" + list.name + "</span>" +
        "            </div>" +
        "            <div class='list-group-item'>" +
        "              <h3 class='inline-header'>Description:</h3>" +
        "              <span class='name'>" + list.description + "</span>" +
        "            </div>" +
        "            <div class='list-group-item verb-list'>" +
        "              <h3 class='inline-header'>Verbs:</h3>" +
        "			   <span> &ndash; </span>" +
        "            </div>" +
        "          </ul>" +
        "        </div>" +
        "      </div>" +
        "      <div class='panel-footer list-buttons'>" +
        "        <button class='btn btn-primary edit-list'>Edit List</button>" +
        "        <button class='btn btn-danger delete-list'>Delete List</button>" +
        "      </div>" + 
        "    </div>" +
        "  </div>" +
        "</div>";
    $("#lists").append(listHtml);
    list.verbs.forEach(function (element) {
    	$("#" + list._id + " .verb-list").append("<span class='infinitive'>" + element.infinitive + " &ndash; </span>");
    });
}

function listOfVerbsToEdit(verb) {
	var verbsToEditHtml =
	"		  <div class='col-md-12 edit-verb-list' id='" + verb._id + "'>" +
    "            <div class='col-md-5'>" + verb.infinitive + "</div>" +
    "            <div class='col-md-2'>" +
    "              <button class='btn btn-danger delete-verb'>X</button>" +
    "            </div>" +
    "          </div>";
    $(".modal-body.part2 fieldset").append(verbsToEditHtml);
}

function renderVerbDropDownMenu() {
	var dropDownMenuHtml = 
	'		  <div class="form-group drop-down">' +
    '            <label class="col-md-4 control-label" for="verbs">Select a new verb:</label>' +
    '            <div class="col-md-3 col-md-offset-1">' +
    '              <select class="verbs" name="verbs">' +
    '              </select>' +
    '            </div>' +
    '            <div class="col-md-2">' +
    '              <button class="btn btn-success verb-addition">Add to list</button>' +
    '            </div>' +
    '            <div class="col-md-2">' +
    '              <button class="btn btn-danger cancel-addition">Cancel</button>' +
    '            </div>' +
    '          </div>';
    $(".modal-body.part2 fieldset").append(dropDownMenuHtml);
    dropDownContents.forEach(function (element) {
    	$(".drop-down select").append("<option value='" + element._id + "''>" + element.infinitive + "</option>");
    });

}
