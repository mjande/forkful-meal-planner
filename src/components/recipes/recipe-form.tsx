import { useForm } from '@mantine/form';
import { Recipe } from '../../models/recipe';
import {
  Button,
  Group,
  NumberInput,
  Textarea,
  TextInput,
  Title,
  Paper,
  Flex,
  Autocomplete,
  ActionIcon,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Link, useLinkProps, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getIngredients } from '../../services/ingredients-service';
import { createRecipe } from '../../services/recipes-service';
import { FormEvent } from 'react';

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const { data } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    initialData: [],
  });

  const navigate = useNavigate({ from: '/recipes/add' });

  const form = useForm<Partial<Recipe>>({
    initialValues: {
      name: recipe?.name ?? '',
      cookingTime: recipe?.cookingTime ?? '',
      description: recipe?.description ?? '',
      instructions: recipe?.instructions ?? '',
      ingredients: recipe?.ingredients ?? [],
    },
  });

  function addIngredient() {
    form.insertListItem('ingredients', {
      name: '',
      unit: '',
      quantity: 1,
    });
  }

  function removeIngredient(index: number) {
    form.removeListItem('ingredients', index);
  }

  const cancelLinkProps = useLinkProps({
    to: recipe ? '/recipes/$recipeId' : '/recipes',
    params: recipe ? { recipeId: recipe.name } : {},
  });

  const create = useMutation({
    mutationFn: createRecipe,
    onSuccess: (recipe) => {
      void navigate({ to: `/recipes/${recipe.id}` });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function submit(event: FormEvent) {
    event.preventDefault();

    if (true) {
      create.mutate(form.values);
    }
  }

  return (
    <form onSubmit={submit}>
      <Group mt="md">
        <Button type="submit">Create Recipe</Button>
        <Button variant="default" component={Link} {...cancelLinkProps}>
          Cancel
        </Button>
      </Group>
      <Flex align="flex-start" gap="md" mt="md">
        <Paper shadow="sm" p="md" style={{ flex: '1 1 0' }} withBorder>
          <TextInput
            label="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Cooking Time"
            key={form.key('cookingTime')}
            {...form.getInputProps('cookingTime')}
          />

          <Textarea
            label="Description"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <Textarea
            label="Instructions"
            key={form.key('instructions')}
            {...form.getInputProps('instructions')}
          />
        </Paper>

        <Paper shadow="sm" p="md" style={{ flex: '1 1 0' }} withBorder>
          <Title order={2}>Ingredients</Title>
          {form.values.ingredients &&
            form.values.ingredients.map((_, index: number) => (
              <Flex key={index} gap="md" align="flex-end">
                <NumberInput
                  label="Amount"
                  key={form.key(`ingredients.${index}.quantity`)}
                  {...form.getInputProps(`ingredients.${index}.quantity`)}
                  w="55px"
                />
                <TextInput
                  label="Unit"
                  key={form.key(`ingredients.${index}.unit`)}
                  {...form.getInputProps(`ingredients.${index}.unit`)}
                  w="55px"
                />
                <Autocomplete
                  label="Ingredient Name"
                  key={form.key(`ingredients.${index}.ingredient`)}
                  data={data}
                  {...form.getInputProps(`ingredients.${index}.name`)}
                ></Autocomplete>
                <ActionIcon color="red" mb="4px">
                  <IconTrash onClick={() => removeIngredient(index)} />
                </ActionIcon>
              </Flex>
            ))}
          <Button mt="sm" onClick={addIngredient}>
            Add Ingredient
          </Button>
          ,
        </Paper>
      </Flex>
    </form>
  );
}
