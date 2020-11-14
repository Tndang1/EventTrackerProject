package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Recipe;
import com.skilldistillery.eventtracker.services.RecipeService;

@RestController
@RequestMapping("api")
public class RecipeController {
	
	@Autowired
	private RecipeService svc;
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
	
	@GetMapping("recipes")
	public List<Recipe> allRecipes(){
		return svc.getAllRecipes();
	}
	
	@GetMapping("recipes/{id}")
	public Recipe getRecipeById(HttpServletResponse response, @PathVariable int id) {
		Recipe recipe = svc.findRecipeById(id);
		if (recipe == null) {
			response.setStatus(404);
		}
		return recipe;
	}
	
	@PostMapping("recipes")
	public Recipe createRecipe(HttpServletResponse response, HttpServletRequest request, @RequestBody Recipe recipe) {
		try {
			recipe = svc.createRecipe(recipe);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			response.setStatus(400);
			recipe = null;
		}
		return recipe;
	}
	
	@PutMapping("recipes/{id}")
	public Recipe updateRecipe(HttpServletResponse response, @RequestBody Recipe recipe, @PathVariable int id) {
		try {
			recipe = svc.updateRecipe(recipe, id);
			if (recipe == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			recipe = null;
		}
		return recipe;
	}
	
	@DeleteMapping("recipes/{id}")
	public void deleteRecipe(HttpServletResponse response, @PathVariable int id) {
		try {
			boolean deleted = svc.deleteRecipeById(id);
			if(deleted) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
		}
	}
	
}
