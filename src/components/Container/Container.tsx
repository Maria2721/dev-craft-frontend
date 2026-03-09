import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './Container.module.scss';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

function Container({ children, className, fluid = false, ...props }: ContainerProps) {
  return (
    <div className={clsx(styles.container, className, { [styles.fluid]: fluid })} {...props}>
      {children}
    </div>
  );
}

export { Container };
