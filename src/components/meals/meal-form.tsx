import { useForm } from '@mantine/form';
import { FormEvent } from 'react';
import { Button, Group, Select, Text } from '@mantine/core';
import dayjs, { Dayjs } from 'dayjs';
import { DatePickerInput } from '@mantine/dates';
import { useMutation } from '@tanstack/react-query';
import { modals } from '@mantine/modals';
import { createMeal } from '../../services/meals-service';
import { Recipe } from '../../models/recipe';

interface formData {
  recipeId: string;
  date: Dayjs;
}

export function MealForm({
  recipeId,
  recipes,
}: {
  recipeId?: number;
  recipes: Recipe[];
}) {
  const form = useForm<formData>({
    initialValues: {
      recipeId: recipeId?.toString() || recipes[0].id.toString(),
      date: dayjs(),
    },
  });

  const create = useMutation({
    mutationFn: createMeal,
    onSuccess: () => {
      console.log('Meal created!');
      modals.closeAll();
    },
    onError: (err) => console.log(err),
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    create.mutate(form.values);
  }

  return (
    <form onSubmit={submit}>
      <Text>
        Pick a recipe and the day you&apos;d like to enjoy it.
        <br />
        To create a new recipe, visit the Recipes page and click Add Recipe.
      </Text>

      <Select
        label="Recipe"
        data={recipes.map((recipe) => ({
          label: recipe.name,
          value: recipe.id.toString(),
        }))}
        key={form.key('recipeId')}
        {...form.getInputProps('recipeId')}
      ></Select>

      <DatePickerInput
        label="Date"
        key={form.key('date')}
        {...form.getInputProps('date')}
      ></DatePickerInput>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => modals.closeAll()}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
