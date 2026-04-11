import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants';

import { useAppSelector } from '../../../hooks/useRedux';

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
