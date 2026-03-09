import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useRedux';

import { NAV_LINKS, ROUTES } from '@/constants';

import { Button, Logo } from '../ui';
import styles from './Header.module.scss';

function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div>
          {isAuth ? (
            <Link to={ROUTES.PROFILE}>
              <Button size="sm">Profile</Button>
            </Link>
          ) : (
            <Link to={ROUTES.PROFILE}>
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header };
