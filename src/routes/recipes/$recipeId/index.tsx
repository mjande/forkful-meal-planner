import {
  createFileRoute,
  Link,
  useLinkProps,
  useNavigate,
} from '@tanstack/react-router';
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
import { modals } from '@mantine/modals';
import { MealForm } from '../../../components/meals/meal-form';
import { deleteRecipe, getRecipe } from '../../../services/recipes-service';
import { Ingredient } from '../../../models/ingredient';
import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/recipes/$recipeId/')({
  component: RouteComponent,
  loader: ({ params }) => getRecipe(parseInt(params.recipeId)),
});

function RouteComponent() {
  const recipe = Route.useLoaderData();
  const navigate = useNavigate({ from: '/recipes/$recipeId' });

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
      onConfirm: () => deleteMut.mutate(recipe.id),
    });
  }

  const editLinkProps = useLinkProps({
    to: '/recipes/$recipeId/edit',
    params: { recipeId: recipe.id.toString() },
  });

  const instructionList = recipe.instructions
    ?.split('\\n')
    .map((step, index) => <ListItem key={index}>{step}</ListItem>);

  const deleteMut = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      console.log('Recipe deleted');
      void navigate({ to: '/recipes' });
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
              {recipe.ingredients.map((ingredient: Ingredient) => (
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
