import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // private baseUrl = 'http://localhost:8085/'
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/recipes';

  constructor(private http: HttpClient) { }

  index(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('RecipeServiceTS.index(): Failed to get recipes[]');
      })
    );
  }

  create(meal: Recipe){
    const httpOptions ={
      headers: {
        'Content-type':'application/json'
      }
    };
    return this.http.post<Recipe>(this.url, meal, httpOptions).pipe(
      catchError((err:any) => {
        console.error(err);
        return throwError('RecipeServiceTS.create(): Failed to create recipe');
      })
    )
  }

  update(meal: Recipe){
    const httpOptions ={
      headers: {
        'Content-type':'application/json'
      }
    };
    return this.http.put<Recipe>(this.url+"/"+meal.id, meal, httpOptions).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('RecipeServiceTS.create(): Failed to update recipe');
      })
    )
  }

  delete(meal: Recipe){
    return this.http.delete<Recipe>(this.url+"/"+meal.id).pipe(
      catchError((err:any)=>{
        console.error(err);
        return throwError('RecipeServiceTS.delete(): Failed to delete')
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
