import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '@/constants';

import { HeaderActions } from '../HeaderActions/HeaderActions';
import styles from './Navigation.module.scss';

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  onNavigate?: () => void;
  isOpen?: boolean;
}

function Navigation({ isOpen, onNavigate, ...props }: NavigationProps) {
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
