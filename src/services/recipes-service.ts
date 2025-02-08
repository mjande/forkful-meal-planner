import { Recipe } from '../models/recipe';

const url = 'http://localhost:3001/recipes';

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(url);
  const data = (await res.json()) as Recipe[];
  return data;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const res = await fetch(`${url}/${id}`);
  const data = (await res.json()) as Recipe;
  return data;
}
