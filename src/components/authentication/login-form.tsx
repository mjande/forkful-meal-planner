import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useAuth } from '../../context/auth-context';

interface FormData {
  email: string;
  password: string;
}

export function openLoginForm() {
  const result = modals.open({
    title: `User Login`,
    children: <LoginForm></LoginForm>,
  });

  return result;
}

export function LoginForm() {
  const { login } = useAuth();

  const form = useForm<FormData>();

  const loginMut = useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      login(data),
    onSuccess: () => {
      console.log('Logged in');
      modals.closeAll();
    },
    onError: (err) => console.log(err),
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    loginMut.mutate(form.values);
  }

  return (
    <form onSubmit={submit}>
      <TextInput
        label="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <PasswordInput
        label="Password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      ></PasswordInput>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => modals.closeAll()}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
