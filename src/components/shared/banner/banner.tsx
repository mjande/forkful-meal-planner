import { Button, Container, Group, Text } from '@mantine/core';
import classes from './banner.module.css';
import { modals } from '@mantine/modals';
import { openRegistrationForm } from '../../authentication/registration-form';
import { LoginForm } from '../../authentication/login-form';
import { useAuth } from '../../../context/auth-context';
import { useNavigate } from '@tanstack/react-router';

export function Banner() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function openLoginForm() {
    modals.open({
      title: `User Login`,
      children: <LoginForm></LoginForm>,
    });
  }

  function openLogoutConfirmation() {
    modals.openConfirmModal({
      title: 'Log Out',
      children: <Text mb="md">Are you sure you want to log out?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        void logout();
        navigate({ to: '/', search: { login: false } });
      },
    });
  }

  return (
    <header className={classes.header}>
      <Container fluid className={classes.container} h={75}>
        <h1 className={classes.headerTitle}>Forkful Meal Planner</h1>
        {isLoggedIn ? (
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
