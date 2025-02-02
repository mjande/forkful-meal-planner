import { useForm } from '@mantine/form';
import { Recipe } from '../../models/recipe';
import { FormEvent } from 'react';
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
import { RecipeIngredient } from '../../models/ingredient';
import { IconTrash } from '@tabler/icons-react';
import { Link, useLinkProps } from '@tanstack/react-router';

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const form = useForm<Recipe>({
    initialValues: recipe,
  });

  function createRecipe(event: FormEvent) {
    event.preventDefault();
    console.log(`Creating recipe ${form.values.name}`);
  }

  function updateRecipe(event: FormEvent) {
    event.preventDefault();
    console.log(`Updating recipe ${form.values.name}`);
  }

  function addIngredient() {
    console.log(form.values);
    form.insertListItem('ingredients', {
      ingredient: { name: '' },
      unit: '',
      amount: 1,
    });
  }

  function removeIngredient(index: number) {
    form.removeListItem('ingredients', index);
  }

  const cancelLinkProps = useLinkProps({
    to: recipe ? '/recipes/$recipeId' : '/recipes',
    params: recipe ? { recipeId: recipe.name } : {},
  });

  return (
    <form>
      <Group mt="md">
        <Button>Create Recipe</Button>
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
            form.values.ingredients.map(
              (recipeIngredient: RecipeIngredient, index: number) => (
                <Flex key={index} gap="md" align="flex-end">
                  <NumberInput
                    label="Amount"
                    key={form.key(`ingredients.${index}.amount`)}
                    {...form.getInputProps(`ingredients.${index}.amount`)}
                    w="55px"
                  />
                  <TextInput
                    label="Unit"
                    key={form.key(`ingredients.${index}.unit`)}
                    {...form.getInputProps(`ingredient.${index}.unit`)}
                    w="55px"
                  />
                  <Autocomplete
                    label="Ingredient Name"
                    defaultValue={recipeIngredient.ingredient.name}
                    key={form.key(`ingredients.${index}.ingredient.name`)}
                    {...form.getInputProps(
                      `ingredient.${index}.ingredient.name`,
                    )}
                  ></Autocomplete>
                  <ActionIcon color="red" mb="4px">
                    <IconTrash onClick={() => removeIngredient(index)} />
                  </ActionIcon>
                </Flex>
              ),
            )}
          <Button mt="sm" onClick={addIngredient}>
            Add Ingredient
          </Button>
          ,
        </Paper>
      </Flex>
    </form>
  );
}
