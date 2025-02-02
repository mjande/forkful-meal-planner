import { createFileRoute, Link, useLinkProps } from '@tanstack/react-router';
import { Recipe } from '../../../models/recipe';
import { Button, Group, Paper, Title, Text, Table, Flex } from '@mantine/core';
import { Header } from '../../../components/shared/header/header';
import { RecipeIngredient } from '../../../models/ingredient';
import { modals } from '@mantine/modals';
import { MealForm } from '../../../components/meals/meal-form';

export const Route = createFileRoute('/recipes/$recipeId/')({
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
  function openMealForm(recipe: string) {
    modals.open({
      title: `Add Recipe to Plan`,
      children: (
        <MealForm
          recipe={recipe}
          closeForm={() => modals.closeAll()}
        ></MealForm>
      ),
    });
  }

  function openDeleteConfirmation(recipe: Recipe) {
    modals.openConfirmModal({
      title: 'Delete Recipe',
      children: (
        <>
          <Text mb="md">
            Are you sure you want to delete this recipe?
            <br />
            Note: This cannot be undone.
          </Text>
          <Text>
            <b>Name:</b> {recipe.name}
          </Text>
          <Text>
            <b>Description:</b> {recipe.description}
          </Text>
        </>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteRecipe(recipe.name),
    });
  }

  function deleteRecipe(recipeId: string) {
    console.log(`Deleting ${recipeId}`);
  }

  const editLinkProps = useLinkProps({
    to: '/recipes/$recipeId/edit',
    params: { recipeId: recipeData.name },
  });

  return (
    <>
      <Header title={recipeData.name}></Header>
      <Group>
        <Button onClick={() => openMealForm(recipeData.name)}>
          Add to Plan
        </Button>
        <Button component={Link} {...editLinkProps}>
          Edit Recipe
        </Button>
        <Button color="red" onClick={() => openDeleteConfirmation(recipeData)}>
          Delete Recipe
        </Button>
      </Group>

      <Flex align="flex-start" gap="md" mt="md">
        <Paper shadow="sm" p="md" style={{ flex: '1 1 0' }} withBorder>
          <Title order={2}>Cooking Time</Title>
          <Text>{recipeData.cookingTime}</Text>

          <Title order={2}>Description</Title>
          <Text>{recipeData.description}</Text>

          <Title order={2}>Instructions</Title>
          <Text>{recipeData.instructions}</Text>
        </Paper>

        <Paper shadow="sm" p="md" h="100%" style={{ flex: '1 1 0' }} withBorder>
          <Title order={2}>Ingredients</Title>
          <Table>
            <Table.Tbody>
              {recipeData.ingredients.map((ingredientRow: RecipeIngredient) => (
                <Table.Tr key={ingredientRow.ingredient.name}>
                  <Table.Td>{ingredientRow.amount}</Table.Td>
                  <Table.Td>{ingredientRow.unit}</Table.Td>
                  <Table.Td>{ingredientRow.ingredient.name}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Flex>
    </>
  );
}
