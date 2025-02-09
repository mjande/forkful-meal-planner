const url = 'http://localhost:3001/ingredients';

export async function getIngredients(): Promise<string[]> {
  const res = await fetch(url);
  const data = (await res.json()) as string[];
  return data;
}
