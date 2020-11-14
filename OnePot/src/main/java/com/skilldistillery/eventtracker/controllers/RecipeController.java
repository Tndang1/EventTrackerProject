package com.skilldistillery.eventtracker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
