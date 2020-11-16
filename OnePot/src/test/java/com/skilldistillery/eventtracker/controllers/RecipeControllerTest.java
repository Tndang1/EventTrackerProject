package com.skilldistillery.eventtracker.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.eventtracker.entities.Recipe;

@SpringBootTest
class RecipeControllerTest {
	@Autowired
	private RecipeController con;
	@Test
	void test_allRecipes() {
		List<Recipe> recipes = con.allRecipes();
		assertNotNull(recipes);
		assertTrue(recipes.size() > 0);
	}
//	@Test
//	void test_getRecipeById(HttpServletResponse response) {
//		Recipe recipe = con.getRecipeById(response, 1);
//		assertNotNull(recipe);
//		assertEquals("Beef Stew", recipe.getName());
//	}
//	@Test
//	void test_getRecipeById_badId(HttpServletResponse response) {
//		Recipe recipe = con.getRecipeById(response, 12345);
//		assertNull(recipe);
//		assertEquals("404", response.getStatus());
//	}

}
