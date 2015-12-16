## Project 1: French Verb Conjugator/Game

#Sprint 1:

Store one of each family of verbs (-er, -ir, -re) in French.

Create buttons for each of these base verbs.

When each button is clicked, the database will display the present-tense conjugation for that particular verb.

#Sprint 2:
Change the buttons for an input field.

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