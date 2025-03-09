import dayjs, { Dayjs } from 'dayjs';
import { getRecipes } from './recipes-service';
import { Meal } from '../models/meal';
import { stripTimeFromDate } from '../utils/date';

interface MealResponse {
  message?: string;
  data: {
    id: number;
    recipeId: number;
    date: string;
  }[];
}

function convertToISODate(date: Dayjs) {
  return date.toISOString().split('T')[0];
}

export async function getMeals(start: Dayjs, end: Dayjs) {
  console.log(`Requesting list of meals between ${stripTimeFromDate(start)} and ${stripTimeFromDate(end)}`);


  const token = localStorage.getItem('token');
  const params = new URLSearchParams({
    start: convertToISODate(start),
    end: convertToISODate(end),
  }).toString();

  const res = await fetch(
    `${import.meta.env.VITE_MEALS_SERVICE_URL}/meals?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const json = (await res.json()) as MealResponse;

  const recipes = await getRecipes();

  const meals: Meal[] = [];
  if (json.data) {
    for (const item of json.data) {
      const recipe = recipes.find((recipe) => recipe.id === item.recipeId);
      if (recipe) {
        meals.push({ id: item.id, date: dayjs(item.date), recipe });
      }
    }
  }

  console.log(`Received list of ${meals.length} between the requested dates`);

  return meals;
}

export async function createMeal(body: { recipeId: string; date: Dayjs }) {
  const token = localStorage.getItem('token');

  const meal = {
    recipeId: parseInt(body.recipeId),
    date: convertToISODate(body.date),
  };

  const res = await fetch(`${import.meta.env.VITE_MEALS_SERVICE_URL}/meals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(meal),
  });
  const json = (await res.json()) as MealResponse;
  return json?.data[0];
}

export async function deleteMeal(id: number) {
  const token = localStorage.getItem('token');

  return await fetch(`${import.meta.env.VITE_MEALS_SERVICE_URL}/meals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });
}
