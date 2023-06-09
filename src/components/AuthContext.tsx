import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

type AuthContextType = {
  isAuth: () => boolean;
  getUser: () =>
    | {
        username: string;
        id: string;
      }
    | undefined;

  createAuth(username: string, id: string): void;

  destroyAuth(): void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [methods, setMethods] = useState<AuthContextType>({
    createAuth(username: string, id: string): void {},
    destroyAuth(): void {},
    getUser(): { username: string; id: string } | undefined {
      return undefined;
    },
    isAuth(): boolean {
      return false;
    },
  });
  const ctxValue = useMemo(() => methods, [methods]);

  const createAuth = (username: string, id: string) => {
    try {
      localStorage.setItem('isAuth', true.toString());
      localStorage.setItem('username', username);
      localStorage.setItem('id', id);
    } catch (err) {}
  };

  const destroyAuth = () => {
    try {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('username');
      localStorage.removeItem('id');
    } catch (err) {}
  };

  const isAuth = () => {
    try {
      return localStorage.getItem('isAuth') === true.toString();
    } catch (err) {
      return false;
    }
  };

  const getUser = () => {
    try {
      const username = localStorage.getItem('username');
      const id = localStorage.getItem('id');

      return username && id ? { username, id } : undefined;
    } catch (err) {
      return undefined;
    }
  };

  useEffect(() => {
    setMethods({
      createAuth,
      destroyAuth,
      isAuth,
      getUser,
    });
  }, []);

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
