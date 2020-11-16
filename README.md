# EventTrackerProject

## Postman tests.

### List all recipes/onepot meals. Method type "GET"
http://localhost:8085/api/recipes

### Find recipe/onepot meal. Method type "GET"
http://localhost:8085/api/recipes/1

### Create a new entry: Method type "POST"
http://localhost:8085/api/recipes/

#### JSON for POST test.
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
http://localhost:8085/api/recipes/2

#### JSON for PUT test
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
http://localhost:8085/api/recipes/3
