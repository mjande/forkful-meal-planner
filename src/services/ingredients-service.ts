import { ApiResponse } from '../models/api-response';

export async function getIngredients(): Promise<string[]> {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/ingredients`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const json = (await res.json()) as ApiResponse<string>;
  return json.data;
}
