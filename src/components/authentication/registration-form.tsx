import { modals } from '@mantine/modals';
import { registerUser } from '../../services/authentication-service';
import { FormEvent } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { PasswordInput, TextInput, Text, Group, Button } from '@mantine/core';

interface FormData {
  username: string;
  password: string;
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
      <Text>Enter a username and password to create a user account.</Text>

      <TextInput
        label="Username"
        key={form.key('username')}
        {...form.getInputProps('username')}
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
