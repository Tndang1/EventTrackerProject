package com.skilldistillery.eventtracker.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Recipe;
import com.skilldistillery.eventtracker.repositories.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService {
	@Autowired
	private RecipeRepository repo;
	@Override
	public List<Recipe> getAllRecipes() {
		return repo.findAll();
	}
	@Override
	public Recipe findRecipeById(Integer id) {
		Optional<Recipe> recOpt = repo.findById(id);
		if(!recOpt.isPresent()) {
			return null;
		}
		return recOpt.get();
	}
	@Override
	public Recipe createRecipe(Recipe recipe) {
		if(recipe.getId() != null) {
			recipe.setId(null);
		}
		if(recipe.getDate() == null) {
			recipe.setDate(LocalDate.now());
		}
		recipe = repo.saveAndFlush(recipe);
		return recipe;
	}
	@Override
	public Recipe updateRecipe(Recipe recipe, Integer id) {
		Recipe dbRecipe = findRecipeById(id);
		if (dbRecipe != null) {
			if(recipe.getActualIngredients() != null) dbRecipe.setActualIngredients(recipe.getActualIngredients());
			if(recipe.getCost() != null) dbRecipe.setCost(recipe.getCost());
			if(recipe.getDate() != null) dbRecipe.setDate(recipe.getDate());
			if(recipe.getName() != null) dbRecipe.setName(recipe.getName());
			if(recipe.getNotes() != null) dbRecipe.setNotes(recipe.getNotes());
			if(recipe.getOriginalRecipe() != null) dbRecipe.setOriginalRecipe(recipe.getOriginalRecipe());
			if(recipe.getServings() != null) dbRecipe.setServings(recipe.getServings());
			repo.flush();
		}
		return dbRecipe;
	}
	@Override
	public boolean deleteRecipeById(Integer id) {
		boolean deleted = false;
		if(repo.existsById(id)) {
			repo.deleteById(id);
			deleted = !repo.existsById(id);
		}
		return deleted;
	}

}
