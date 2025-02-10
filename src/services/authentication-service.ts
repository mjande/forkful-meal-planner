export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (!(username === 'admin' && password == '1234')) {
    throw new Error('auth error');
  }

  localStorage.setItem('user', username);
}

export async function logout() {
  localStorage.removeItem('user');
}

export function isLoggedIn() {
  return localStorage.getItem('user') != null;
}

export async function registerUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  console.log('Created user: ', username);

  return { username, password };
}
