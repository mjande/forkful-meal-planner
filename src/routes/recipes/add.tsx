import { Title } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { RecipeForm } from '../../components/recipes/recipe-form';

export const Route = createFileRoute('/recipes/add')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title order={1}>Add Recipe</Title>
      <RecipeForm></RecipeForm>
    </>
  );
}
