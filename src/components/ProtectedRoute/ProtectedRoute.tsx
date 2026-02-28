import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useRedux';

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
