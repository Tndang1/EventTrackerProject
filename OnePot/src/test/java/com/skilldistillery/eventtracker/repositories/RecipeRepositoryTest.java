package com.skilldistillery.eventtracker.repositories;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.eventtracker.entities.Recipe;

@SpringBootTest
class RecipeRepositoryTest {
	@Autowired
	private RecipeRepository repo;

	@Test
	void test_RecipeRepository() {
		List<Recipe> recipes = repo.findAll();
		assertNotNull(recipes);
		assertTrue(recipes.size() > 0);
	}

}
