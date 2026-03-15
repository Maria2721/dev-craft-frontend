import clsx from 'clsx';
import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

interface LogoProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'full' | 'icon';
  className?: string;
}

function Logo({ variant = 'full', className }: LogoProps) {
  return (
    <Link to="/" className={clsx(styles.logo, styles[variant], className)}>
      <img src="/logo.svg" alt="" />
      <span>DevCraft</span>
    </Link>
  );
}

export { Logo };
