import type { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useRedux';

import { ROUTES } from '@/constants';

import { Button } from '../../ui';

interface HeaderActionsProps extends HTMLAttributes<HTMLDivElement> {
  onNavigate?: () => void;
}

function HeaderActions({ onNavigate, className, ...props }: HeaderActionsProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const to = isAuth ? ROUTES.PROFILE : ROUTES.LOGIN;
  const label = isAuth ? 'Profile' : 'Login';

  return (
    <div className={className} {...props}>
      {!isAuth && (
        <Link to={ROUTES.REGISTER} onClick={onNavigate}>
          <Button size="sm">Register</Button>
        </Link>
      )}
      <Link to={to} onClick={onNavigate}>
        <Button size="sm">{label}</Button>
      </Link>
    </div>
  );
}

export { HeaderActions };
