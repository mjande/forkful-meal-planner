export interface GroceryQty {
  unit: string;
  quantity: number;
}

export interface GroceryIngredients {
  name: string;
  quantities: GroceryQty[];
}
