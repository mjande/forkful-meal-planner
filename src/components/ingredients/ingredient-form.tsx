import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Ingredient } from '../../models/ingredient';
import { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import { createIngredient } from '../../services/ingredients-service';

export function IngredientForm({ ingredient }: { ingredient?: Ingredient }) {
  const isNew = ingredient === undefined;

  const form = useForm({
    initialValues: ingredient,
  });

  const createMutation = useMutation({
    mutationFn: createIngredient,
    onSuccess: () => {
      modals.closeAll();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function updateIngredient() {
    if (ingredient === undefined) {
      return;
    }

    console.log(
      `Updating ingredient ${ingredient.name} to ${form.values.name}`,
    );
  }

  function submit(event: FormEvent) {
    event.preventDefault();

    if (isNew) {
      createMutation.mutate(form.values);
    } else {
      updateIngredient();
    }
  }

  return (
    <form onSubmit={submit}>
      <TextInput
        label="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => modals.closeAll()}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
