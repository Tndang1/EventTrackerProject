import { Recipe } from './../../models/recipe';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-event-tracker',
  templateUrl: './event-tracker.component.html',
  styleUrls: ['./event-tracker.component.css']
})
export class EventTrackerComponent implements OnInit {
  recipes = [];
  selected = null;
  newRecipe = new Recipe();
  updateRecipe = new Recipe();
  showNewForm: boolean = false;
  showUpdateForm: boolean = false;
  monthVal = -1;
  yearVal = -1;

  constructor(private recipeService: RecipeService){}


  ngOnInit(): void {
    this.loadRecipe();
  }

  return(): void{
    this.selected = null;
    this.newRecipe = new Recipe();
    this.updateRecipe = new Recipe();
    this.showNewForm = false;
    this.showUpdateForm = false;
  }
  costPerServing(recipe:Recipe):number{
    return (recipe.cost/recipe.servings);
  }
  totalCost(recipes: Recipe[]):number{
    let value:number = 0;
    recipes.forEach(recipe => {
      value += recipe.cost;
    });
    return value;
  }
  totalServings(recipes: Recipe[]):number{
    let value:number = 0;
    recipes.forEach(recipe => {
      value += recipe.servings;
    });
    return value;
  }

  loadRecipe():void{
    this.recipeService.index().subscribe(
      data=>{
      this.recipes = data;
        },
      err=>{
        console.error('EventTrackerComponent.loadRecipe(): Failed to load');
        console.error(err);
      }
    )
  }

  addAMeal(newMeal: Recipe):void{
    this.recipeService.create(newMeal).subscribe(
      data=> {
        this.loadRecipe();
        this.return();
      },
      err=>{
        console.error(err);
        console.error('EventTrackerComponent.addAMeal():Failed to add meal');


      }
    )
  }
  updateForm():void{
    this.updateRecipe = this.selected;
    this.showUpdateForm = true;
  }
  updateAMeal(updatedRecipe: Recipe):void{
    this.recipeService.update(updatedRecipe).subscribe(
      data=> {
        this.loadRecipe();
        this.return();
      },
      err=>{
        console.error(err);
        console.error('EventTrackerComponent.updateAMeal():Failed to update meal');


      }
    )
  }
  deleteMeal():void{
    this.recipeService.delete(this.selected).subscribe(
      data=> {
        this.loadRecipe();
        this.return();
      },
      err=>{
        console.error(err);
        console.error('EventTrackerComponent.deleteMeal():Failed to delete');
      }
    )
  }
}
