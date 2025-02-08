import { useForm } from '@mantine/form';
import { FormEvent } from 'react';
import { Button, Group, Select, Text } from '@mantine/core';
import dayjs, { Dayjs } from 'dayjs';
import { DatePickerInput } from '@mantine/dates';

const recipeData = ['Spaghetti Carbonara', 'Hot Dogs', 'Stew'];

interface formData {
  recipeId: number;
  date: Dayjs;
}

export function MealForm(props: { recipeId?: number; closeForm: () => void }) {
  const { recipeId, closeForm } = props;

  const form = useForm<formData>({
    initialValues: {
      recipeId: recipeId || 0,
      date: dayjs(),
    },
  });

  function createMeal(event: FormEvent) {
    event.preventDefault();

    console.log(
      `Creating meal: ${form.values.recipeId} on ${form.values.date.format('MM/DD/YYYY')}`,
    );

    closeForm();
  }

  return (
    <form onSubmit={createMeal}>
      <Text>
        Pick a recipe and the day you&apos;d like to enjoy it.
        <br />
        To create a new recipe, visit the Recipes page and click Add Recipe.
      </Text>

      <Select
        label="Recipe"
        data={recipeData}
        key={form.key('recipe')}
        {...form.getInputProps('recipe')}
      ></Select>

      <DatePickerInput
        label="Date"
        key={form.key('date')}
        {...form.getInputProps('date')}
      ></DatePickerInput>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={closeForm}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
