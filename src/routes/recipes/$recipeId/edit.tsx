import { createFileRoute } from '@tanstack/react-router';
import { Recipe } from '../../../models/recipe';
import { Header } from '../../../components/shared/header/header';
import { RecipeForm } from '../../../components/recipes/recipe-form';

export const Route = createFileRoute('/recipes/$recipeId/edit')({
  component: RouteComponent,
});

const recipeData: Recipe = {
  name: 'Spaghetti Carbonara',
  cookingTime: '35 minutes',
  description: 'A pasta dish made with eggs, cheese, bacon, and black pepper.',
  instructions: 'Cook the thing. Cook it more. Stir in other ingredients',
  ingredients: [
    {
      ingredient: { name: 'spaghetti' },
      unit: 'lbs',
      amount: 1,
    },
    {
      ingredient: { name: 'salt' },
      unit: 'oz',
      amount: 3,
    },
  ],
};

function RouteComponent() {
  return (
    <>
      <Header title="Edit Recipe"></Header>
      <RecipeForm recipe={recipeData}></RecipeForm>
    </>
  );
}
