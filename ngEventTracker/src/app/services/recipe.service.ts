import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:8085/'
  private url = this.baseUrl + 'api/recipes';

  constructor(private http: HttpClient) { }

  index(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  create(meal: Recipe){
    return this.http.post<Recipe>(this.url, meal).pipe(
      catchError((err:any) => {
        console.error(err);
        return throwError('Failed to post')
      })
    )
  }

  update(meal: Recipe){
    return this.http.put<Recipe>(this.url+"/"+meal.id, meal).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('Failed to put')
      })
    )
  }

  delete(meal: Recipe){
    return this.http.delete<Recipe>(this.url+"/"+meal.id).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('Failed to delete')
      })
    )
  }
  // index(): Recipe[]{
  //   return [...this.recipes];
  // }

  // create(recipe: Recipe):void{
  //   this.recipes.push(recipe);
  // }

  // remove(recipeToDel: Recipe):void{
  //   let ind = this.recipes.findIndex(recipe => recipe.id === recipeToDel.id);
  //   this.recipes.splice(ind,1);
  // }

  // update(updateRecipe: Recipe): void{
  //   let ind = this.recipes.findIndex(recipe => recipe.id === updateRecipe.id);
  //   this.recipes[ind] = Object.assign({}, updateRecipe);
  // }
}
