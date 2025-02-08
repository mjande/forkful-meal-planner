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
import { modals } from '@mantine/modals';
import { MealForm } from '../../components/meals/meal-form';
import { getRecipes } from '../../services/recipes-service';
import { useState } from 'react';

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
  loader: getRecipes,
});

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const showDetailsLinkProps = useLinkProps({
    to: '/recipes/$recipeId',
    params: { recipeId: recipe.id.toString() },
  });

  function openMealForm(recipeId: number) {
    modals.open({
      title: `Add Recipe to Plan`,
      children: (
        <MealForm
          recipeId={recipeId}
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
        <Button onClick={() => openMealForm(recipe.id)}>Add to Plan</Button>
      </Group>
    </Card>
  );
}

function RouteComponent() {
  const recipes = Route.useLoaderData();

  const [query, setQuery] = useState<string>();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  function filter(query?: string) {
    if (recipes.length === 0) {
      setFilteredRecipes([]);
    } else if (!query) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.name.includes(query)),
      );
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
          data={recipes.map((recipe) => recipe.name)}
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
