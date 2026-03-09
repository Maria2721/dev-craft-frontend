import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '@/constants';

import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { Navigation };
