package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Recipe;

public interface RecipeService {
	List<Recipe> getAllRecipes();
	Recipe findRecipeById(Integer id);
	Recipe createRecipe(Recipe recipe);
	Recipe updateRecipe(Recipe recipe, Integer id);
	boolean deleteRecipeById(Integer id);
}
