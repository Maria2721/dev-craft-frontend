import { type SubmitHandler, useForm } from 'react-hook-form';

import type { LoginFormInputs, LoginFormProps } from '@/ts/interfaces';

import { Button, Input } from '../../ui';
import styles from './LoginForm.module.scss';

const EMAIL_VALID_FORMAT = /^\S+@\S+\.\S+$/;
const MIN_PASSWORD_LENGTH = 6;
const LETTER_REGEX = /[A-Za-z]/;
const DIGIT_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/;

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  });

  const handleFormSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)} className={styles.form}>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        {...register('email', {
          required: 'Email is required',
          validate: {
            validFormat: (value) =>
              EMAIL_VALID_FORMAT.test(value) || 'Email must be in the format "example@domain.com"',
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `Minimum ${MIN_PASSWORD_LENGTH} characters`,
          },
          validate: {
            oneEnglishLetter: (value) =>
              LETTER_REGEX.test(value) || 'Password must contain at least one English letter',
            oneDigit: (value) =>
              DIGIT_REGEX.test(value) || 'Password must contain at least one number',
            oneSpecialCharacter: (value) =>
              SPECIAL_CHAR_REGEX.test(value) ||
              'Password must contain at least one special character (!@#$%^&*...)',
          },
        })}
        error={errors.password?.message}
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
