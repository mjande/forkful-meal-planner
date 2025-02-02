import { createFileRoute, Link, useLinkProps } from '@tanstack/react-router';
import { Header } from '../components/shared/header/header';
import dayjs from 'dayjs';
import { Button, Card, Flex, Select, Title, Text, Group } from '@mantine/core';
import { Recipe } from '../models/recipe';
import { RecipeIngredient } from '../models/ingredient';
import { Meal } from '../models/meal';
import { modals } from '@mantine/modals';
import { MealForm } from '../components/meals/meal-form';

export const Route = createFileRoute('/meal-plans')({
  component: RouteComponent,
});

const ingredients: RecipeIngredient[] = [
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
];

const recipeData: Recipe[] = [
  {
    name: 'Spaghetti Carbonara',
    cookingTime: '35 minutes',
    description:
      'A pasta dish made with eggs, cheese, bacon, and black pepper.',
    instructions: 'Cook the thing. Cook it more. Stir in other ingredients',
    ingredients,
  },
  {
    name: 'Hot Dogs',
    cookingTime: '20 minutes',
    description: 'Obviously these are hot dogs',
    instructions: 'Cook the hot dog. Eat the hot dog',
    ingredients,
  },
];

const mealData: Meal[] = [
  {
    recipe: recipeData[0],
    date: dayjs('2/3/2025'),
  },
  {
    recipe: recipeData[1],
    date: dayjs('2/4/2025'),
  },
];

function getMostRecentMonday() {
  const today = dayjs();
  const daysSinceMonday = (today.day() + 6) % 7;
  return today.subtract(daysSinceMonday, 'day');
}

function getDateRanges() {
  const startDate = getMostRecentMonday();
  const ranges: string[] = [];

  for (let i = 0; i < 4; i++) {
    const startOfWeek = startDate.add(i * 7, 'day');
    const endOfWeek = startOfWeek.add(6, 'day');

    ranges.push(
      startOfWeek.format('MM/DD/YYYY') + ' - ' + endOfWeek.format('MM/DD/YYYY'),
    );
  }

  return ranges;
}

function MealCard({ meal }: { meal: Meal }) {
  function openDeleteConfirmation(meal: Meal) {
    modals.openConfirmModal({
      title: 'Remove Meal',
      children: (
        <>
          <Text mb="md">
            Are you sure you want to remove this meal from your current plan?
            <br />
            Note: This cannot be undone.
          </Text>
          <Text>
            <b>Name:</b> {meal.recipe.name}
          </Text>
          <Text>
            <b>Description:</b> {meal.recipe.description}
          </Text>
          <Text>
            <b>Date:</b> {meal.date.format('MM-DD-YYYY')}
          </Text>
        </>
      ),
      labels: { confirm: 'Remove', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => removeMeal(meal.recipe.name),
    });
  }

  function removeMeal(mealId: string) {
    console.log(`Removing ${mealId} from plan`);
  }

  const showDetailsLinkProps = useLinkProps({
    to: '/recipes/$recipeId',
    params: { recipeId: meal.recipe.name },
  });

  return (
    <Card shadow="sm" w="300px" withBorder>
      <Title order={3}>{meal.recipe.name}</Title>
      <Text>{meal.recipe.description}</Text>
      <Text mt="auto">{meal.recipe.cookingTime}</Text>
      <Text mb="sm">{meal.date.format('MM-DD-YYYY')}</Text>

      <Group justify="space-between">
        <Button component={Link} {...showDetailsLinkProps}>
          Show Recipe
        </Button>
        <Button onClick={() => openDeleteConfirmation(meal)}>Remove</Button>
      </Group>
    </Card>
  );
}

const mealElements = mealData.map((meal) => (
  <MealCard key={meal.recipe.name} meal={meal}></MealCard>
));

function RouteComponent() {
  const dateRanges = getDateRanges();

  function openMealForm() {
    modals.open({
      title: `Add Recipe to Plan`,
      children: <MealForm closeForm={() => modals.closeAll()}></MealForm>,
    });
  }

  return (
    <>
      <Header title="Meal Plans"></Header>
      <Flex justify="space-between" align="flex-end">
        <Select
          label="Week"
          description="Select a week to display meals"
          data={dateRanges}
          defaultValue={dateRanges[0]}
          w="225px"
        />

        <Button onClick={openMealForm}>Add Meal to Plan</Button>
      </Flex>
      <Flex gap="sm" mt="sm">
        {mealElements}
      </Flex>
    </>
  );
}
