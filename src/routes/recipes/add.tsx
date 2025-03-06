import { createFileRoute } from '@tanstack/react-router';
import { RecipeForm } from '../../components/recipes/recipe-form';
import { Header } from '../../components/shared/header/header';
import { checkAuthentication } from '../../services/authentication-service';

export const Route = createFileRoute('/recipes/add')({
  component: RouteComponent,
  beforeLoad: ({ context }) => checkAuthentication(context.isLoggedIn),
});

function RouteComponent() {
  return (
    <>
      <Header title="Add Recipe"></Header>
      <RecipeForm></RecipeForm>
    </>
  );
}
