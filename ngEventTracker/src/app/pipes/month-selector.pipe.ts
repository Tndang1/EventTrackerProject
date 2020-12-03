import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe';

@Pipe({
  name: 'monthSelector',
})
export class MonthSelectorPipe implements PipeTransform {
  transform(recipes: Recipe[], month: number, year: number): Recipe[] {
    let recReturn = [];
    if (month == -1 || year == -1){
      return recipes;
    }
    recipes.forEach((recipe) => {
      if (
        parseInt(recipe.date.toString().substr(0,4)) == year &&
        parseInt(recipe.date.toString().substr(5,2)) == month
      ) {
        recReturn.push(recipe);
      }
    });
    return recReturn;
  }
}
