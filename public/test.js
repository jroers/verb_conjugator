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