import { ApiResponse } from '../models/api-response';
import { Recipe } from '../models/recipe';

export async function getRecipes(): Promise<Recipe[]> {
  console.log("Requesting list of recipes");

  const token = localStorage.getItem('token');

  const res = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/recipes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const json = (await res.json()) as ApiResponse<Recipe>;

  console.log(`Received list of ${json.data.length} recipes`);

  return json.data;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/recipes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const json = (await res.json()) as ApiResponse<Recipe>;
  const recipe = json.data[0];

  // Go backend converts an empty list to null: undo that here
  if (recipe.ingredients === null) {
    recipe.ingredients = [];
  }

  if (recipe.tags === null) {
    recipe.tags = [];
  }

  return recipe;
}

export async function createRecipe(recipe: Partial<Recipe>): Promise<Recipe> {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/recipes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(recipe),
    },
  );
  const json = (await res.json()) as ApiResponse<Recipe>;
  return json.data[0];
}

export async function updateRecipe({
  id,
  recipe,
}: {
  id: number;
  recipe: Partial<Recipe>;
}): Promise<Recipe> {
  console.log("Requesting update for recipe with ID ", id);
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/recipes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(recipe),
    },
  );
  const json = (await res.json()) as ApiResponse<Recipe>;

  return json.data[0];
}

export async function deleteRecipe(id: number) {
  const token = localStorage.getItem('token');

  return await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/recipes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    },
  );
}
