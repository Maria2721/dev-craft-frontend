import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '@/constants';

import { HeaderActions } from '../HeaderActions/HeaderActions';
import styles from './Navigation.module.scss';

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  onNavigate?: () => void;
  isOpen?: boolean;
}

function Navigation({ isOpen, onNavigate, ...props }: NavigationProps) {
  const NAV_LINKS = [
    { label: 'Knowledge Map', to: ROUTES.MAP },
    { label: 'Progress', to: ROUTES.PROGRESS },
    { label: 'Interview', to: ROUTES.INTERVIEW },
  ];

  return (
    <nav className={clsx(styles.nav, isOpen && styles.open)} {...props}>
      <ul className={styles.list}>
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
              to={to}
              onClick={onNavigate}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <HeaderActions onNavigate={onNavigate} />
    </nav>
  );
}

export { Navigation };
