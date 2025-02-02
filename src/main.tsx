import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  fontFamily: 'Quicksand',
  colors: {
    'brand-dark': [
      '#375665',
      '#2D5061',
      '#234B5F',
      '#19475D',
      '#0F435C',
      '#143A4C',
      '#17323F',
      '#192C35',
      '#19272D',
      '#182227',
    ],
    'brand-light': [
      '#FAF7F3',
      '#F0E3D1',
      '#ECD1AC',
      '#F0C383',
      '#FDB754',
      '#E8A647',
      '#D3953E',
      '#B8853D',
      '#9B7642',
      '#836944',
      '#705D43',
    ],
    'brand-accent': [
      '#F9F7F5',
      '#E9DED9',
      '#DDC6BC',
      '#D6AF9E',
      '#D5987D',
      '#DA8159',
      '#E76930',
      '#CD602E',
      '#AA5B38',
      '#8F563C',
      '#79503E',
      '#684A3D',
      '#5A443B',
    ],
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
);
