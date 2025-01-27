import './App.css';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    <MantineProvider>
      <h1>Hello World</h1>
    </MantineProvider>
  );
}
