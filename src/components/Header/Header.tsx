import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useRedux';

import { ROUTES } from '@/constants';

import { Container } from '../Container/Container';
import { Navigation } from '../Navigation/Navigation';
import { Button, Logo } from '../ui';
import styles from './Header.module.scss';

function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <header className={styles.header}>
      <Container>
        <Logo />
        <Navigation />
        <div>
          {isAuth ? (
            <Link to={ROUTES.PROFILE}>
              <Button size="sm">Profile</Button>
            </Link>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}

export { Header };
