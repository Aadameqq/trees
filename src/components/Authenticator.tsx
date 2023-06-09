import { ReactNode, useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import UnauthorizedError from '@/components/UnauthorizedError';

export function Authenticator({ children }: { children: ReactNode }) {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth()) {
    return <UnauthorizedError />;
  }

  return <>{children}</>;
}
