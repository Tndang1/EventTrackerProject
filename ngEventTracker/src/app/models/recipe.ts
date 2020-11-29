export class Recipe {
  id: number;
  name: string;
  originalRecipe: string;
  actualIngredients: string;
  cost: number;
  servings: number;
  date: Date;
  notes: string;

  constructor(
    id?: number,
    name?: string,
    originalRecipe?: string,
    actualIngredients?: string,
    cost?: number,
    servings?: number,
    date?: Date,
    notes?: string
  ) {
    this.id = id;
    this.name = name;
    this.originalRecipe = originalRecipe;
    this.actualIngredients = actualIngredients;
    this.cost = cost;
    this.servings = servings;
    this.date = date;
    this.notes = notes;
  }
}
