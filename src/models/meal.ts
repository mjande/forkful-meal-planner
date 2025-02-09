import { Dayjs } from 'dayjs';
import { Recipe } from './recipe';

export interface Meal {
  id: number;
  recipe: Recipe;
  date: Dayjs;
}
