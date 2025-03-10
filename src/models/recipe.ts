import { Ingredient } from './ingredient';

export interface Recipe {
  id: number;
  name: string;
  cookingTime?: string;
  description?: string;
  instructions?: string;
  ingredients: Ingredient[];
  tags: string[];
}
