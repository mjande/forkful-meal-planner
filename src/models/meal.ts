import { Dayjs } from 'dayjs';
import { Recipe } from './recipe';

export interface Meal {
  recipe: Recipe;
  date: Dayjs;
}
