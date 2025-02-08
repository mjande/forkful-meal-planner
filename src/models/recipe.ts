import { RecipeIngredient } from './ingredient';

export interface Recipe {
  id: number;
  name: string;
  cookingTime?: string;
  description?: string;
  instructions?: string;
  ingredients: RecipeIngredient[];
}
