import { createFileRoute } from '@tanstack/react-router';
import { RecipeForm } from '../../components/recipes/recipe-form';
import { Header } from '../../components/shared/header/header';

export const Route = createFileRoute('/recipes/add')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Add Recipe"></Header>
      <RecipeForm></RecipeForm>
    </>
  );
}
