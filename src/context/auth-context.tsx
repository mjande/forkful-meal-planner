import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser } from '../services/authentication-service';

export interface AuthData {
  isLoggedIn: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthData>({} as AuthData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const tokenFromApi = await loginUser({ email, password });
    if (tokenFromApi) {
      localStorage.setItem('token', tokenFromApi);
      setIsLoggedIn(true);
    }

    return tokenFromApi;
  }

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
