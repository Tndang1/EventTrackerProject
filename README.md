# EventTrackerProject

## Overview
This project is designed to track the instant/one pot meals the user makes. The ideal user would have a tendency to use online recipes as an inspiration and substitute ingredients with cheaper options or items on hand, and wants to keep track of actual used ingredients, cost, actual number of meals, and notes about the pot.

## Long-term improvement
1. Further enhancements of this project would allow a user to select their ingredients on hand to be able to find recipes that use those ingredients, in either the actual recipe or the user's previous substitutions.
2. Allow multiple reviews per made meal, and multiple meals per recipe, so that a user might more easily see their thoughts and modifications to any given recipe.

## Technologies used
1. Spring Tool Suite
2. Spring Data JPA
3. REST
4. MySQL
5. Postman
6. AWS

## Page use
1. Initial page. User can click the 'Add a meal' button. The form for adding meal info will appear at the top of the page. User can fillout the form and select submit to add a meal. User can also select cancel and close the form.
2. Initial page. User can select a meal from the list below the 'Add a meal' button. This will expand the meal and provide more detailed information about that entry. Clicking the top of the entry will close it. They will also see an 'update' and 'delete' button.
3. On selecting update the update form will appear. User can edit each field and submit, or select cancel.
4. On selecting delete the entry is removed, and user is returned to the homepage.

## Bugs
1. If the user selects and closes several entries they will sometimes duplicate the previous entries information in the page. A refresh or selecting the entry will show the correct information.
2. If the user selects update, then cancels, then updates a different entry the first entry will copy the informatino of the second entry.

## Postman tests.
All tests are meant to be run in postman using the included endpoint mapping. The correct method type for each test is listed in the header for each test. The create and update methods have valid JSON data included below the url.
##### The hyperlinks for the get methods can be entered into a web browser. All other methods are intended to be tested with postman.

### List all recipes/onepot meals. Method type "GET"
http://3.134.35.160:8080/OnePot/api/recipes

### Find recipe/onepot meal. Method type "GET"
http://3.134.35.160:8080/OnePot/api/recipes/1

### Create a new entry: Method type "POST"
http://3.134.35.160:8080/OnePot/api/recipes/

####  JSON for POST test.
{
    "name": "Create Tester",
    "originalRecipe": "https://thesaltymarshmallow.com/best-ever-instant-pot-beef-stew/",
    "actualIngredients": "2 potatoes, 1 small can tomato sauce, 1/2 lb beef, mixed vegetables.",
    "cost": 15.0,
    "servings": 7,
    "date": "2020-11-01",
    "notes": "Accidentally added lots of italian seasoning, worked out."
}

### Update an entry. Method type "PUT". Name will update, originalRecipe will ignore the null entry and not update.
http://3.134.35.160:8080/OnePot/api/recipes/2

####  JSON for PUT test
{
    "name": "Update test",
    "originalRecipe": null,
    "actualIngredients": "2 potatoes, 1 small can tomato sauce, 1/2 lb beef, mixed vegetables.",
    "cost": 15.0,
    "servings": 7,
    "date": "2020-11-01",
    "notes": "Accidentally added lots of italian seasoning, worked out."
}

### Delete an entry. Method type "DELETE"
http://3.134.35.160:8080/OnePot/api/recipes/3
