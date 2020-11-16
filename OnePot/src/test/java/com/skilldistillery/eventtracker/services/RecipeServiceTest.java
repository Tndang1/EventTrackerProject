package com.skilldistillery.eventtracker.services;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.eventtracker.entities.Recipe;

@SpringBootTest
class RecipeServiceTest {
	@Autowired
	private RecipeService svc;
	
	@Test
	void test_getAllRecipes() {
		List<Recipe> recipes = svc.getAllRecipes();
		assertNotNull(recipes);
		assertTrue(recipes.size() > 0);
	}
	@Test
	void test_findRecipeById() {
		Recipe r = svc.findRecipeById(1);
		assertNotNull(r);
		assertEquals("Beef Stew", r.getName());
	}

}

//Recipe createRecipe(Recipe recipe);
//Recipe updateRecipe(Recipe recipe, Integer id);
//boolean deleteRecipeById(Integer id);