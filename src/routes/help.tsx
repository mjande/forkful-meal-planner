import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/shared/header/header';
import { List, ListItem, Text } from '@mantine/core';

export const Route = createFileRoute('/help')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Help"></Header>
      <Text my="md">
        New to Forkful Meal Planner? Follow these easy to steps to get started
        planning all your delicious meals.
      </Text>
      <List mx="xl" my="md" type="ordered">
        <ListItem>Navigate to the Recipes page and click Add Recipe.</ListItem>
        <ListItem>
          Use the form fields on the Recipe Form to add a name, description,
          cooking time, and instructions to your new recipe.
        </ListItem>
        <ListItem>
          Use the Add Ingredient button to add any required ingredients to your
          new recipe. These will be displayed with the recipe details after
          you’ve created the recipe. If you are re-using ingredients that you
          have used before, these will be available as an option as well.
        </ListItem>
        <ListItem>
          Submit the form. You should see a card for your new recipe appear on
          the Recipes page.
        </ListItem>
        <ListItem>
          Click the Add to Plan button in the card for your new recipe. This
          will prompt you to select a date to prepare and enjoy your recipe.
        </ListItem>
        <ListItem>
          Repeat these steps for any additional recipes you would like to create
          in the future.
        </ListItem>
        <ListItem>
          To see your planned meals, navigate to the Meal Plans page using the
          navigation sidebar. Here you can view all the recipes you plan to
          prepare within a certain date range.
        </ListItem>
      </List>
      <Text my="md">We hope you enjoy using the Forkful Meal</Text>
    </>
  );
}
