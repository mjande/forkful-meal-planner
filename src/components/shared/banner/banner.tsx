import { Button, Container, Group, Text } from '@mantine/core';
import classes from './banner.module.css';
import { modals } from '@mantine/modals';
import { LoginForm } from '../../authentication/login-form';
import { isLoggedIn, logout } from '../../../services/authentication-service';
import { useState } from 'react';
import { RegistrationForm } from '../../authentication/registration-form';

export function Banner() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  function openLoginForm() {
    modals.open({
      title: `User Login`,
      children: <LoginForm></LoginForm>,
      onClose: () => setLoggedIn(isLoggedIn()),
    });
  }

  function openRegistrationForm() {
    modals.open({
      title: `Register User`,
      children: <RegistrationForm></RegistrationForm>,
      onClose: () => setLoggedIn(isLoggedIn()),
    });
  }

  function openLogoutConfirmation() {
    modals.openConfirmModal({
      title: 'Log Out',
      children: <Text mb="md">Are you sure you want to log out?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => void logout(),
      onClose: () => setLoggedIn(isLoggedIn()),
    });
  }

  return (
    <header className={classes.header}>
      <Container fluid className={classes.container} h={75}>
        <h1 className={classes.headerTitle}>Forkful Meal Planner</h1>
        {loggedIn ? (
          <Button color="brand-accent" onClick={openLogoutConfirmation}>
            Log Out
          </Button>
        ) : (
          <Group>
            <Button color="brand-accent" onClick={openRegistrationForm}>
              Register
            </Button>
            <Button color="brand-accent" onClick={openLoginForm}>
              Log In
            </Button>
          </Group>
        )}
      </Container>
    </header>
  );
}
