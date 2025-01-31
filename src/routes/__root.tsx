import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Banner } from '../components/banner/banner';
import { Navbar } from '../components/navbar/navbar';
import { AppShell } from '@mantine/core';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppShell
      header={{ height: 75 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Header>
        <Banner />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools position="bottom-right" />
      </AppShell.Main>
    </AppShell>
  );
}
