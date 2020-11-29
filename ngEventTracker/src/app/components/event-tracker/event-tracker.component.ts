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

  loadRecipe():void{
    this.recipeService.index().subscribe(
      data=>{
      this.recipes = data;
      this.recipes.sort((a,b)=>a.date-b.date).reverse();
      console.log('Stuff successful');
      },
      err=>{
        console.error('Stuff failed');
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
        console.error('Failed to add meal');


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
        console.error('Failed to update meal');


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
        console.error('Failed to delete');
      }
    )
  }
}
