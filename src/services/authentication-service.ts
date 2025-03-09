import { redirect } from '@tanstack/react-router';

export async function checkAuthentication(isLoggedIn: boolean) {
  if (!isLoggedIn) {
    throw redirect({
      to: '/',
      search: { login: true },
    });
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log("Requesting login for user ", email);

  const result = await fetch(
    `${import.meta.env.VITE_USER_AUTH_SERVICE_URL}/login`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
  );

  const data = (await result.json()) as { token?: string; message: string };

  if (result.status != 200 || !data.token) {
    console.log(data.message);
    return;
  }

  console.log('Succesfully logged in!: Received token ', data.token);
  return data.token;
}

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const result = await fetch(
    `${import.meta.env.VITE_USER_AUTH_SERVICE_URL}/register`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
  );
  const data = (await result.json()) as { message: string };

  if (result.status != 201) {
    throw new Error('Authentication error');
  }

  return { email, password };
}
