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
import { useEffect, useState } from 'react';
import { checkAuthentication } from '../../services/authentication-service';

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => checkAuthentication(context.isLoggedIn),
  loader: getRecipes,
});

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const recipes = Route.useLoaderData();

  const showDetailsLinkProps = useLinkProps({
    to: '/recipes/$recipeId',
    params: { recipeId: recipe.id.toString() },
  });

  function openMealForm(recipeId: number) {
    modals.open({
      title: `Add Recipe to Plan`,
      children: <MealForm recipeId={recipeId} recipes={recipes}></MealForm>,
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
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    let recipeArray = recipes;
    if (query) {
      recipeArray = recipeArray.filter((recipe) =>
        recipe?.name.includes(query),
      );
    }

    for (const tag of tags) {
      recipeArray = recipeArray.filter((recipe) => recipe?.tags?.includes(tag));
    }

    setFilteredRecipes(recipeArray);
  }, [recipes, query, tags]);

  function toggleTag(tag: string, checked: boolean) {
    setTags((prev) => {
      const newSet = new Set(prev);

      if (checked) {
        newSet.add(tag);
      } else {
        newSet.delete(tag);
      }

      return newSet;
    });
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
          data={[...new Set(recipes.map((recipe) => recipe.name))]}
          onChange={(value: string) => setQuery(value)}
          style={{ marginRight: 'auto' }}
        ></Autocomplete>
        <Text>Click to select tag(s)</Text>
        <Chip
          variant="light"
          onChange={(checked) => toggleTag('low-carb', checked)}
        >
          Low-Carb
        </Chip>
        <Chip
          variant="light"
          onChange={(checked) => toggleTag('vegetarian', checked)}
        >
          Vegetarian
        </Chip>
      </Flex>
      <Flex gap="sm" wrap="wrap">
        {recipeElements}
      </Flex>
    </>
  );
}
