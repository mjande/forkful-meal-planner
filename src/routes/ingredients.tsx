import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/shared/header/header';
import { ActionIcon, Button, Flex, Paper, Table, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { Ingredient } from '../models/ingredient';
import { IngredientForm } from '../components/ingredients/ingredient-form';
import { useQuery } from '@tanstack/react-query';
import { getIngredients } from '../services/ingredients-service';

export const Route = createFileRoute('/ingredients')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, refetch } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });

  function deleteIngredient(ingredientId: string) {
    console.log(`Deleting ${ingredientId}`);
  }

  function openAddIngredientForm() {
    modals.open({
      title: 'Add Ingredient',
      children: <IngredientForm></IngredientForm>,
      onClose: () => {
        void refetch();
      },
    });
  }

  function openEditIngredientForm(ingredient: Ingredient) {
    modals.open({
      title: `Edit Ingredient: ${ingredient.name}`,
      children: <IngredientForm ingredient={ingredient}></IngredientForm>,
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
        </>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteIngredient(ingredient.name),
    });
  }

  const rows = data?.map((ingredient) => (
    <Table.Tr key={ingredient.id}>
      <Table.Td style={{ minWidth: '200px', width: 'auto' }}>
        {ingredient.name}
      </Table.Td>
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
              <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </>
  );
}
