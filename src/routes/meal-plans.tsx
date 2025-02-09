import { createFileRoute, Link, useLinkProps } from '@tanstack/react-router';
import { Header } from '../components/shared/header/header';
import dayjs from 'dayjs';
import { Button, Card, Flex, Select, Title, Text, Group } from '@mantine/core';
import { Meal } from '../models/meal';
import { modals } from '@mantine/modals';
import { MealForm } from '../components/meals/meal-form';
import { deleteMeal, getMeals } from '../services/meals-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRecipes } from '../services/recipes-service';

export const Route = createFileRoute('/meal-plans')({
  component: RouteComponent,
  loader: () => getRecipes(),
});

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

function MealCard({ meal, refresh }: { meal: Meal; refresh: () => void }) {
  const deleteMut = useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => {
      modals.closeAll();
      refresh();
    },
  });

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
      onConfirm: () => deleteMut.mutate(meal.id),
    });
  }

  const showDetailsLinkProps = useLinkProps({
    to: '/recipes/$recipeId',
    params: { recipeId: meal.recipe.id.toString() },
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

function RouteComponent() {
  const recipes = Route.useLoaderData();

  const dateRanges = getDateRanges();
  const defaultStart = dayjs(dateRanges[0].split(' - ')[0]);
  const defaultEnd = dayjs(dateRanges[0].split(' - ')[1]);

  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);

  const { data, refetch } = useQuery({
    queryKey: ['meals', start, end],
    queryFn: () => getMeals(start, end),
  });

  function openMealForm() {
    modals.open({
      title: `Add Recipe to Plan`,
      children: <MealForm recipes={recipes}></MealForm>,
      onClose: () => void refetch(),
    });
  }

  function handleSelect(value: string | null) {
    if (value) {
      const dates = value.split(' - ');
      setStart(dayjs(dates[0]));
      setEnd(dayjs(dates[1]));
    }
  }

  function refresh() {
    void refetch();
  }

  const mealCards = data?.map((meal) => (
    <MealCard key={meal.id} meal={meal} refresh={refresh}></MealCard>
  ));

  return (
    <>
      <Header title="Meal Plans"></Header>
      <Flex justify="space-between" align="flex-end">
        <Select
          label="Week"
          description="Select a week to display meals"
          data={dateRanges}
          defaultValue={dateRanges[0]}
          onChange={handleSelect}
          w="225px"
        />

        <Button onClick={openMealForm}>Add Meal to Plan</Button>
      </Flex>
      <Flex gap="sm" mt="sm">
        {mealCards}
      </Flex>
    </>
  );
}
