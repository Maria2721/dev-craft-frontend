import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes, useId } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { label, error, helperText, type = 'text', id, disabled, className, ...rest } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div
      className={clsx(
        styles.wrapper,
        error && styles.errorState,
        disabled && styles.disabled,
        className,
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={styles.field}>
        <input
          className={styles.input}
          {...rest}
          type={type}
          ref={ref}
          id={inputId}
          disabled={disabled}
        />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!error && helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
