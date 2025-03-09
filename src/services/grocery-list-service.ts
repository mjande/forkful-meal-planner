import { Dayjs } from 'dayjs';
import { ApiResponse } from '../models/api-response';
import { getMeals } from './meals-service';
import { GroceryIngredients } from '../models/grocery-list';
import { stripTimeFromDate } from '../utils/date';

export async function generateGroceryList(startDate: Dayjs, endDate: Dayjs) {
  console.log(`Requesting grocery list for meals between ${stripTimeFromDate(startDate)} and ${stripTimeFromDate(endDate)}`);

  const meals = await getMeals(startDate, endDate);
  const recipeIds = meals.map((meal) => meal.recipe.id);

  const ingredientsRes = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/ingredients`,
    {
      method: 'POST',
      body: JSON.stringify(recipeIds),
    },
  );
  const ingredientsJson = (await ingredientsRes.json()) as ApiResponse<number>;

  const res = await fetch(
    `${import.meta.env.VITE_GROCERY_LIST_SERVICE_URL}/generate`,
    {
      method: 'POST',
      body: JSON.stringify(ingredientsJson.data),
    },
  );

  const json = (await res.json()) as ApiResponse<GroceryIngredients>;
  console.log(`Received grocery list of ${json.data.length} ingredients`);
  return json.data;
}
