import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../../../components/shared/header/header';
import { RecipeForm } from '../../../components/recipes/recipe-form';
import { getRecipe } from '../../../services/recipes-service';
import { checkAuthentication } from '../../../services/authentication-service';

export const Route = createFileRoute('/recipes/$recipeId/edit')({
  component: RouteComponent,
  beforeLoad: ({ context }) => checkAuthentication(context.isLoggedIn),
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
