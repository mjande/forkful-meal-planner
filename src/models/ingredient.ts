export interface Ingredient {
  name: string;
  units: string;
}

export interface IngredientAmount {
  ingredient: Ingredient;
  amount: number;
}
