import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <Link to="/" className={clsx(styles.logo, styles[size], className)}>
      <img src="./logo.svg" alt="Logo" />
    </Link>
  );
}
