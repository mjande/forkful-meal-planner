import dayjs, { Dayjs } from 'dayjs';
import { getRecipes } from './recipes-service';
import { Meal } from '../models/meal';

const url = 'http://localhost:3001/meals';

function convertToISODate(date: Dayjs) {
  return date.toISOString().split('T')[0];
}

export async function getMeals(start: Dayjs, end: Dayjs) {
  const res = await fetch(
    url +
      '?' +
      new URLSearchParams({
        start: convertToISODate(start),
        end: convertToISODate(end),
      }).toString(),
  );

  const data = (await res.json()) as {
    id: number;
    recipeId: number;
    date: string;
  }[];

  const recipes = await getRecipes();

  const meals: Meal[] = [];
  for (const item of data) {
    const recipe = recipes.find((recipe) => recipe.id === item.recipeId);
    if (recipe) {
      meals.push({ id: item.id, date: dayjs(item.date), recipe });
    }
  }

  return meals;
}

export async function createMeal(body: { recipeId: string; date: Dayjs }) {
  const meal = {
    recipeId: parseInt(body.recipeId),
    date: convertToISODate(body.date),
  };

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(meal),
  });
  const data = (await res.json()) as Meal;
  return data;
}

export async function deleteMeal(id: number) {
  return await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
}
