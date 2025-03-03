import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { loginUser } from '../../services/authentication-service';

interface FormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const form = useForm<FormData>();

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      console.log('Logged in');
      modals.closeAll();
    },
    onError: (err) => console.log(err),
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    login.mutate(form.values);
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
