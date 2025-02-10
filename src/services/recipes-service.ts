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

  // Go backend converts an empty list to null: undo that here
  if (data.ingredients === null) {
    data.ingredients = [];
  }

  if (data.tags === null) {
    data.tags = [];
  }

  return data;
}

export async function createRecipe(recipe: Partial<Recipe>): Promise<Recipe> {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(recipe),
  });
  const data = (await res.json()) as Recipe;
  return data;
}

export async function updateRecipe({
  id,
  recipe,
}: {
  id: number;
  recipe: Partial<Recipe>;
}): Promise<Recipe> {
  const res = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(recipe),
  });
  const data = (await res.json()) as Recipe;
  return data;
}

export async function deleteRecipe(id: number) {
  return await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
}
