import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../../../components/shared/header/header';
import { RecipeForm } from '../../../components/recipes/recipe-form';
import { getRecipe } from '../../../services/recipes-service';

export const Route = createFileRoute('/recipes/$recipeId/edit')({
  component: RouteComponent,
  loader: ({ params }) => getRecipe(parseInt(params.recipeId)),
});

function RouteComponent() {
  const recipe = Route.useLoaderData();
  const key = JSON.stringify(recipe);

  return (
    <>
      <Header title="Edit Recipe"></Header>
      <RecipeForm recipe={recipe} key={key}></RecipeForm>
    </>
  );
}
