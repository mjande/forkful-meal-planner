import { ApiResponse } from '../models/api-response';

export async function getIngredients(): Promise<string[]> {
  const res = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/ingredients`,
  );
  const json = (await res.json()) as ApiResponse<string>;
  return json.data;
}
