import { RecipeIngredient } from './ingredient';

export interface Recipe {
  name: string;
  cookingTime: string;
  description: string;
  instructions: string;
  ingredients: RecipeIngredient[];
}
