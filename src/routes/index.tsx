import { Title, Text, Image, Group, Container, List } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Group justify="space-between" m="md">
        <Title order={1}>Forkful Meal Planner</Title>
        <Link to="/help">
          <IconHelp />
        </Link>
      </Group>
      <Text m="md">
        Stop procrastinating and start cooking with Forkful Meal Planner!
        Organize your kitchen like a pro by tracking ingredients, managing
        recipes, and planning meals for the entire week. Whether you&apos;re
        cooking for one or a family, Forkful makes it easy to stay on top of
        your meals, reduce food waste, and enjoy stress-free dining every day.
      </Text>
      <Group m="md">
        <Image
          h={300}
          w="auto"
          radius="md"
          fit="contain"
          src="src/assets/index-pic.jpg"
        />
        <Container>
          <Title order={2}>Features</Title>
          <List>
            <List.Item>
              Create individual ingredients to track amounts for each recipe
            </List.Item>
            <List.Item>
              Create recipes to add to your weekly meal plans
            </List.Item>
            <List.Item>
              Find created recipes using the handy search bar or search filters
            </List.Item>
            <List.Item>
              View your meals by week to prepare for the days ahead
            </List.Item>
          </List>
        </Container>
      </Group>
      <Text mx="md" my="lg">
        First time here? Check out the <Link to="/help">Help</Link> page for
        information about how to get started.
      </Text>
    </main>
  );
}
