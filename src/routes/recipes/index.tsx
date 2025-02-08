import { createFileRoute, Link, useLinkProps } from '@tanstack/react-router';
import { Header } from '../../components/shared/header/header';
import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Group,
  Title,
  Text,
  Chip,
} from '@mantine/core';
import { Recipe } from '../../models/recipe';
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import { MealForm } from '../../components/meals/meal-form';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../../services/recipes-service';

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
});

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const showDetailsLinkProps = useLinkProps({
    to: '/recipes/$recipeId',
    params: { recipeId: recipe.id.toString() },
  });

  function openMealForm(recipe: string) {
    modals.open({
      title: `Add Recipe to Plan`,
      children: (
        <MealForm
          recipe={recipe}
          closeForm={() => modals.closeAll()}
        ></MealForm>
      ),
    });
  }

  return (
    <Card shadow="sm" withBorder w="300px">
      <Title order={3}>{recipe.name}</Title>
      <Text>{recipe.description}</Text>
      <Text mt="auto" mb="sm">
        {recipe.cookingTime}
      </Text>

      <Group justify="space-between">
        <Button component={Link} {...showDetailsLinkProps}>
          Show Details
        </Button>
        <Button onClick={() => openMealForm(recipe.name)}>Add to Plan</Button>
      </Group>
    </Card>
  );
}

function RouteComponent() {
  const { data, refetch } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  const [query, setQuery] = useState<string>();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(data || []);

  useEffect(() => {
    if (data) {
      setFilteredRecipes(data);
    }
  }, [data]);

  function filter(query?: string) {
    if (!data || data.length === 0) {
      setFilteredRecipes([]);
    } else if (!query) {
      setFilteredRecipes(data);
    } else {
      setFilteredRecipes(data.filter((recipe) => recipe.name.includes(query)));
    }
  }

  const recipeElements = filteredRecipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
  ));

  return (
    <>
      <Header title="Recipes"></Header>
      <Button component={Link} to="/recipes/add">
        Add Recipe
      </Button>
      <Flex align="flex-end" gap="md" my="sm">
        <Autocomplete
          label="Search for a recipe"
          data={data?.map((recipe) => recipe.name)}
          onChange={(value: string) => setQuery(value)}
        ></Autocomplete>
        <Button style={{ marginRight: 'auto' }} onClick={() => filter(query)}>
          Search
        </Button>
        <Chip variant="light">Low-Carb</Chip>
        <Chip variant="light">Vegetarian</Chip>
      </Flex>
      <Flex gap="sm">{recipeElements}</Flex>
    </>
  );
}
