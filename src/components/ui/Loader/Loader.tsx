import clsx from 'clsx';

import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader = ({ size = 'md', className }: LoaderProps) => {
  return <span className={clsx(styles.loader, styles[size], className)} />;
};
