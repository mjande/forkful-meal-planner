import { Group, Title } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function Header({ title }: { title: string }) {
  return (
    <Group justify="space-between" m="md">
      <Title order={1}>{title}</Title>
      <Link to="/help">
        <IconHelp />
      </Link>
    </Group>
  );
}
