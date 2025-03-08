import { ApiResponse } from '../models/api-response';

export async function generateGroceryList(recipeIds: number[] | undefined) {
  const ingredientsRes = await fetch(
    `${import.meta.env.VITE_RECIPES_SERVICE_URL}/ingredients`,
    {
      method: 'POST',
      body: JSON.stringify(recipeIds),
    },
  );
  const json = (await ingredientsRes.json()) as ApiResponse<number>;

  const res = await fetch(
    `${import.meta.env.VITE_GROCERY_LIST_SERVICE_URL}/generate`,
    {
      method: 'POST',
      body: JSON.stringify(json.data),
    },
  );

  console.log(res);
}
