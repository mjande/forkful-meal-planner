import { modals } from '@mantine/modals';
import { registerUser } from '../../services/authentication-service';
import { FormEvent } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { PasswordInput, TextInput, Text, Group, Button } from '@mantine/core';

interface FormData {
  email: string;
  password: string;
}

export function openRegistrationForm() {
  modals.open({
    title: `Register User`,
    children: <RegistrationForm></RegistrationForm>,
  });
}

export function RegistrationForm() {
  const form = useForm<FormData>();

  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      modals.closeAll();
    },
    onError: (err) => console.log(err),
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    register.mutate(form.values);
  }

  return (
    <form onSubmit={submit}>
      <Text>Enter your email and password to create a user account.</Text>

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
