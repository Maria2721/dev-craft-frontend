import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  isActive?: boolean;
}

function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  isActive = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.active]: isActive,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
