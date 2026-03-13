import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '@/constants';

import styles from './Navigation.module.scss';

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  onNavigate?: () => void;
  isOpen?: boolean;
}

function Navigation({ isOpen, onNavigate, ...props }: NavigationProps) {
  return (
    <nav className={clsx(styles.nav, isOpen && styles.open)} {...props}>
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} onClick={onNavigate}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { Navigation };
