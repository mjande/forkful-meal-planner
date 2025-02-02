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
import { RecipeIngredient } from '../../models/ingredient';
import { useState } from 'react';

export const Route = createFileRoute('/recipes/')({
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

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const showDetailsLinkProps = useLinkProps({
    to: '/recipes/$recipeId',
    params: { recipeId: recipe.name },
  });

  return (
    <Card shadow="sm" withBorder={true} w="300px">
      <Title order={3}>{recipe.name}</Title>
      <Text>{recipe.description}</Text>
      <Text mt="auto" mb="sm">
        {recipe.cookingTime}
      </Text>

      <Group>
        <Button component={Link} {...showDetailsLinkProps}>
          Show Details
        </Button>
        <Button>Add to Plan</Button>
      </Group>
    </Card>
  );
}

function RouteComponent() {
  const [query, setQuery] = useState<string>();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipeData);

  function search(query?: string) {
    if (query) {
      setFilteredRecipes(
        recipeData.filter((recipe) => recipe.name.includes(query)),
      );
    } else {
      setFilteredRecipes(recipeData);
    }
  }

  const recipeElements = filteredRecipes.map((recipe) => (
    <RecipeCard key={recipe.name} recipe={recipe}></RecipeCard>
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
          data={recipeData.map((recipe) => recipe.name)}
          onChange={(value: string) => setQuery(value)}
        ></Autocomplete>
        <Button style={{ marginRight: 'auto' }} onClick={() => search(query)}>
          Search
        </Button>
        <Chip variant="light">Low-Carb</Chip>
        <Chip variant="light">Vegetarian</Chip>
      </Flex>
      <Flex gap="sm">{recipeElements}</Flex>
    </>
  );
}
