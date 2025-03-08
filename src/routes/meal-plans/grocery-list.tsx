import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../../components/shared/header/header';
import { List, ListItem, Paper } from '@mantine/core';
import { generateGroceryList } from '../../services/grocery-list-service';
import dayjs from 'dayjs';
import { capitalize } from '../../utils/format';

export const Route = createFileRoute('/meal-plans/grocery-list')({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      startDate: string;
      endDate: string;
    },
  loaderDeps: ({ search: { startDate, endDate } }) => ({
    startDate,
    endDate,
  }),
  loader: async ({ deps: { startDate, endDate } }) => {
    console.log('INSIDE LOADER');
    return generateGroceryList(dayjs(startDate), dayjs(endDate));
  },
});

function RouteComponent() {
  const groceryList = Route.useLoaderData();
  const { startDate, endDate } = Route.useSearch();
  const formattedStart = startDate.replace(/-/g, '/');
  const formattedEnd = endDate.replace(/-/g, '/');

  const listElements = groceryList?.map((ingredient) => {
    const quantities = ingredient?.quantities
      .map((qty) => `${qty.quantity} ${qty.unit}`)
      .join(', ');
    return (
      <ListItem key={ingredient.name}>
        {capitalize(ingredient.name)}: {quantities}
      </ListItem>
    );
  });

  return (
    <>
      <Header
        title={`Grocery List for ${formattedStart} - ${formattedEnd}`}
      ></Header>
      <Paper shadow="sm" p="md" withBorder>
        <List>{listElements}</List>
      </Paper>
    </>
  );
}
