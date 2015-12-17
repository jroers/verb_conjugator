## Project 1: French Verb Conjugator/List Creator

#Sprint 1:

Store one of each family of verbs (-er, -ir, -re) in French.

Create buttons for each of these base verbs.

When each button is clicked, the database will display the present-tense conjugation for that particular verb.

#Sprint 2:
Replace the buttons for an input field/search bar.

Whatever the user inputs will be checked against the database. If the verb exists, it will display the present tense conjugation on the screen. If it doesn't exist, default "not found" text will display on the screen.

Each verb should display with buttons for each tense: Present and Imparfait.

When each button is clicked, the text in the conjugation grid will update to the apropriate information.

#Sprint 3:
Added edit buttons that change the conjugations into text boxes. The text boxes pull the initial information from its respective cell of the conjugation grid. This allows the user to make changes to all necessary subjects in this tense prior to saving.

Searching for a verb that has a valid infinitive structure (ends in "ir", "er" or "re") presents a button to create a new verb from the typed infinitive.

Clicking the "Create?" button opens up a Create Verb modal that will populate with manipulations of the typed infinitive.

#Sprint 4:
Created secondary html page at the path /lists. This will hold all of the list information that contains verbs.

At the top of the lists page is a list creation form. Currently, the database is fairly small, so the multi-select field works. Research should be done to implement an auto-complete search bar.

Upon submission of a new list, the page will update to show all of the lists.

#Sprint 5:
The Edit List button opens up a modal that displays all of the contents of a list.

A user can update the text fields for the list name and description, as well as view the associated verbs.

Next to each individual verb is a red X button that will queue the verb for removal from the list.

Below the list of verbs is a button to add a new verb to the list. When selected, the button will be replaced with a dropdown menu where the user can select a new verb to be added. Then the user can either cancel out of the addition, or save the verb. Once saved, the verb will be added to the end of the verb list, and the "add another verb" button will reappear at the bottom of the list.

Once "Save Changes" is clicked, the information captured in this modal will be sent to the database to update the list, and then repopulate the main page with the most recent list data.

For future development, I would like this list to look through the list of verbs already on the list and update itself to only display content that has not yet been added.

##Towards the Future:
Currently in the code, I have commented out HTML for the base quiz structure. This information should be hidden on page load, but shown when a "Quiz Me!" button is clicked.

The quiz section will populate with the group of verbs from the parent list.

A user should have the ability to select exactly which verbs they would like to be quizzed on. The selected verbs would then be pushed into an array. If no verb is selected, all verbs on the list would be pushed into the array.

Ideally, there would be an option to specify which tense the user would like to be quizzed on. This would specify the exact path in the verb object from which the quiz screen would populate.
