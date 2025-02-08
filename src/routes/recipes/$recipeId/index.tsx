import { createFileRoute, Link, useLinkProps } from '@tanstack/react-router';
import { Recipe } from '../../../models/recipe';
import {
  Button,
  Group,
  Paper,
  Title,
  Text,
  Table,
  Flex,
  ListItem,
  List,
} from '@mantine/core';
import { Header } from '../../../components/shared/header/header';
import { RecipeIngredient } from '../../../models/ingredient';
import { modals } from '@mantine/modals';
import { MealForm } from '../../../components/meals/meal-form';
import { getRecipe } from '../../../services/recipes-service';

export const Route = createFileRoute('/recipes/$recipeId/')({
  component: RouteComponent,
  loader: ({ params }) => getRecipe(parseInt(params.recipeId)),
});

function RouteComponent() {
  const recipe = Route.useLoaderData();

  function openMealForm(id: number) {
    modals.open({
      title: `Add Recipe to Plan`,
      children: (
        <MealForm recipeId={id} closeForm={() => modals.closeAll()}></MealForm>
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
      onConfirm: () => deleteRecipe(recipe.id),
    });
  }

  function deleteRecipe(recipeId: number) {
    console.log(`Deleting ${recipeId}`);
  }

  const editLinkProps = useLinkProps({
    to: '/recipes/$recipeId/edit',
    params: { recipeId: recipe.id.toString() },
  });

  const instructionList = recipe.instructions
    ?.split('\\n')
    .map((step, index) => <ListItem key={index}>{step}</ListItem>);

  return (
    <>
      <Header title={recipe.name}></Header>
      <Group>
        <Button onClick={() => openMealForm(recipe.id)}>Add to Plan</Button>
        <Button component={Link} {...editLinkProps}>
          Edit Recipe
        </Button>
        <Button color="red" onClick={() => openDeleteConfirmation(recipe)}>
          Delete Recipe
        </Button>
      </Group>

      <Flex align="flex-start" gap="md" mt="md">
        <Paper shadow="sm" p="md" style={{ flex: '1 1 0' }} withBorder>
          <Title order={2}>Cooking Time</Title>
          <Text>{recipe.cookingTime}</Text>

          <Title order={2}>Description</Title>
          <Text>{recipe.description}</Text>

          <Title order={2}>Instructions</Title>
          <List type="ordered">{instructionList}</List>
        </Paper>

        <Paper shadow="sm" p="md" h="100%" style={{ flex: '1 1 0' }} withBorder>
          <Title order={2}>Ingredients</Title>
          <Table>
            <Table.Tbody>
              {recipe.ingredients.map((ingredient: RecipeIngredient) => (
                <Table.Tr key={ingredient.id}>
                  <Table.Td>{ingredient.quantity}</Table.Td>
                  <Table.Td>{ingredient.unit}</Table.Td>
                  <Table.Td>{ingredient.name}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Flex>
    </>
  );
}
