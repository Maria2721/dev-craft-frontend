import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useRedux';

import { ROUTES } from '@/constants';

import { Button } from '../ui';

function UserControls() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuth) {
    return (
      <Link to={ROUTES.PROFILE}>
        <Button size="sm">Profile</Button>
      </Link>
    );
  }

  return (
    <Link to={ROUTES.LOGIN}>
      <Button size="sm">Login</Button>
    </Link>
  );
}

export { UserControls };
