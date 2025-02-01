import { Button, Container } from '@mantine/core';
import classes from './banner.module.css';

export function Banner() {
  return (
    <header className={classes.header}>
      <Container fluid className={classes.container} h={75}>
        <h1 className={classes.headerTitle}>Forkful Meal Planner</h1>
        <Button color="brand-accent">Log Out</Button>
      </Container>
    </header>
  );
}
