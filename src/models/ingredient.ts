export interface Ingredient {
  id: number;
  name: string;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  unit: string;
  amount: number;
}
