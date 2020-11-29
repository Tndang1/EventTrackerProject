package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
	List<Recipe> findAllByOrderByDateDesc();
}
