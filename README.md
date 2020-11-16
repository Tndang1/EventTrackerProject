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

## Postman tests.
All tests are meant to be run in postman using the included endpoint mapping. The correct method type for each test is listed in the header for each test. The create and update methods have valid JSON data included below the url.

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
