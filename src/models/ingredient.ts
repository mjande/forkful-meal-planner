export interface Ingredient {
  name: string;
  units?: string;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  unit: string;
  amount: number;
}
