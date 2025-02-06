import { Ingredient } from '../models/ingredient';

const url = 'http://localhost:3001/ingredients';

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch(url);
  const data = (await res.json()) as Ingredient[];
  return data;
}

export async function createIngredient(ingredient: Partial<Ingredient>) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(ingredient),
  });
}
