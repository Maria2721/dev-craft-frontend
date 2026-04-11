import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants';

import { useAppSelector } from '../../../hooks/useRedux';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
