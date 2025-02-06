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

export async function updateIngredient({
  id,
  ingredient,
}: {
  id: number;
  ingredient: Partial<Ingredient>;
}) {
  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(ingredient),
  });
}

export async function deleteIngredient(id: number) {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
}
