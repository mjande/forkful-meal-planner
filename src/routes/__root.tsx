import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Banner } from '../components/shared/banner/banner';
import { Navbar } from '../components/shared/navbar/navbar';
import { AppShell, Container } from '@mantine/core';
import { AuthData } from '../context/auth-context';

export const Route = createRootRouteWithContext<AuthData>()({
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

      <AppShell.Main bg="brand-light.1">
        <main>
          <Container size="xl">
            <Outlet />
          </Container>
        </main>
        <TanStackRouterDevtools position="bottom-right" />
      </AppShell.Main>
    </AppShell>
  );
}
