package com.skilldistillery.eventtracker.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	@Column(name="original_recipe")
	private String originalRecipe;
	@Column(name="actual_ingredients")
	private String actualIngredients;
	private Double cost;
	@Column(name="actual_servings")
	private Integer servings;
	private LocalDate date;
	private String notes;
	//Constructor
	public Recipe() {
	}
	//Getters/Setters
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOriginalRecipe() {
		return originalRecipe;
	}
	public void setOriginalRecipe(String originalRecipe) {
		this.originalRecipe = originalRecipe;
	}
	public String getActualIngredients() {
		return actualIngredients;
	}
	public void setActualIngredients(String actualIngredients) {
		this.actualIngredients = actualIngredients;
	}
	public Double getCost() {
		return cost;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}
	public Integer getServings() {
		return servings;
	}
	public void setServings(Integer servings) {
		this.servings = servings;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	//hashCode/equals
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Recipe other = (Recipe) obj;
		if (id != other.id)
			return false;
		return true;
	}
}
