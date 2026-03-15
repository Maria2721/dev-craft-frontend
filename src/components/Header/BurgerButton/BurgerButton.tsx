import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import styles from './BurgerButton.module.scss';

interface BurgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

function BurgerButton({ isOpen, onClick, ...props }: BurgerButtonProps) {
  return (
    <button className={clsx(styles.burger, isOpen && styles.open)} onClick={onClick} {...props}>
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
}

export { BurgerButton };
