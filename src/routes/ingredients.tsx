import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/shared/header/header';
import { ActionIcon, Button, Flex, Paper, Table, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { Ingredient } from '../models/ingredient';
import { IngredientForm } from '../components/ingredients/ingredient-form';

export const Route = createFileRoute('/ingredients')({
  component: RouteComponent,
});

const ingredients: Ingredient[] = [
  {
    name: 'Chicken',
    units: 'Lbs',
  },
  {
    name: 'Olive Oil',
    units: 'Tbsp',
  },
  {
    name: 'Flour',
    units: 'Tbsp',
  },
  {
    name: 'Garlic',
    units: 'Cloves',
  },
  {
    name: 'Salt',
    units: 'Tsp',
  },
  {
    name: 'Butter High Fructose Corn Syrup Deluxe',
    units: 'Oz',
  },
];

function RouteComponent() {
  function deleteIngredient(ingredientId: string) {
    console.log(`Deleting ${ingredientId}`);
  }

  function openAddIngredientForm() {
    modals.open({
      title: 'Add Ingredient',
      children: (
        <IngredientForm closeForm={() => modals.closeAll()}></IngredientForm>
      ),
    });
  }

  function openEditIngredientForm(ingredient: Ingredient) {
    modals.open({
      title: `Edit Ingredient: ${ingredient.name}`,
      children: (
        <IngredientForm
          ingredient={ingredient}
          closeForm={() => modals.closeAll()}
        ></IngredientForm>
      ),
    });
  }

  function openDeleteModal(ingredient: Ingredient) {
    modals.openConfirmModal({
      title: 'Delete Ingredient',
      children: (
        <>
          <Text mb="md">
            Are you sure you want to delete this ingredient?
            <br />
            Note: This cannot be undone.
          </Text>
          <Text>
            <b>Name:</b> {ingredient.name}
          </Text>
          <Text>
            <b>Units:</b> {ingredient.units}
          </Text>
        </>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteIngredient(ingredient.name),
    });
  }

  const rows = ingredients.map((ingredient) => (
    <Table.Tr key={ingredient.name}>
      <Table.Td style={{ minWidth: '200px', width: 'auto' }}>
        {ingredient.name}
      </Table.Td>
      <Table.Td style={{ minWidth: '75px' }}>{ingredient.units}</Table.Td>
      <Table.Td style={{ width: '100px' }}>
        <Flex gap="md">
          <ActionIcon variant="default">
            <IconEdit onClick={() => openEditIngredientForm(ingredient)} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash onClick={() => openDeleteModal(ingredient)} />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Header title="Ingredients"></Header>
      <Button mb="md" onClick={openAddIngredientForm}>
        Add Ingredient
      </Button>
      <Paper shadow="xs" withBorder={true} style={{ width: 'min-content' }}>
        <Table style={{ width: 'min-content' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Units</Table.Th>
              <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </>
  );
}
