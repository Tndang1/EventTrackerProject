package com.skilldistillery.eventtracker.services;

import java.util.List;

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

}
