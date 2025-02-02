import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Ingredient } from '../../models/ingredient';
import { FormEvent } from 'react';

export function IngredientForm(props: {
  ingredient?: Ingredient;
  closeForm: () => void;
}) {
  const { ingredient, closeForm } = props;

  const isNew = ingredient === undefined;

  const form = useForm({
    initialValues: ingredient,
  });

  function createIngredient() {
    console.log(
      `Creating ingredient: ${form.values.name} (${form.values.units})`,
    );
  }

  function updateIngredient() {
    if (ingredient === undefined) {
      return;
    }

    console.log(
      `Updating ingredient ${ingredient.name} to ${form.values.name} (${form.values.units})`,
    );
  }

  function submit(event: FormEvent) {
    event.preventDefault();

    if (isNew) {
      createIngredient();
    } else {
      updateIngredient();
    }

    closeForm();
  }

  return (
    <form onSubmit={submit}>
      <TextInput
        label="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <TextInput
        label="Units"
        key={form.key('units')}
        {...form.getInputProps('units')}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={closeForm}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
