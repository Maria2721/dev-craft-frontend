import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useRedux';

import { ROUTES } from '@/constants';

import { Button } from '../../ui';

function HeaderActions() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const to = isAuth ? ROUTES.PROFILE : ROUTES.LOGIN;
  const label = isAuth ? 'Profile' : 'Login';

  return (
    <Link to={to}>
      <Button size="sm">{label}</Button>
    </Link>
  );
}

export { HeaderActions };
