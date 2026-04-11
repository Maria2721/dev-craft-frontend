import { type SubmitHandler, useForm } from 'react-hook-form';

import type { RegisterFormInputs, RegisterFormProps } from '@/ts/interfaces';

import { Button, Input } from '../../ui';
import styles from './RegisterForm.module.scss';

const MIN_FIRST_NAME_LENGTH = 3;
const MIN_LAST_NAME_LENGTH = 4;
const CHARACTER_REGEX = /^[A-Za-z-]+$/;
const FIRST_LETTER_UPPERCASE_REGEX = /^[A-Z]/;

const EMAIL_VALID_FORMAT = /^\S+@\S+\.\S+$/;

const MIN_PASSWORD_LENGTH = 6;
const LETTER_REGEX = /[A-Za-z]/;
const DIGIT_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/;

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const handleFormSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)} className={styles.form}>
      <Input
        label="First Name"
        autoComplete="given-name"
        {...register('firstName', {
          required: 'First name is required',
          minLength: {
            value: MIN_FIRST_NAME_LENGTH,
            message: `Minimum ${MIN_FIRST_NAME_LENGTH} characters`,
          },
          validate: {
            onlyEnglish: (value) =>
              CHARACTER_REGEX.test(value) || 'Only English letters and "-" are allowed',
            firstUppercase: (value) =>
              FIRST_LETTER_UPPERCASE_REGEX.test(value) || 'First letter must be uppercase',
          },
        })}
        error={errors.firstName?.message}
      />

      <Input
        label="Last Name"
        autoComplete="family-name"
        {...register('lastName', {
          required: 'Last name is required',
          minLength: {
            value: MIN_LAST_NAME_LENGTH,
            message: `Minimum ${MIN_LAST_NAME_LENGTH} characters`,
          },
          validate: {
            onlyEnglish: (value) =>
              CHARACTER_REGEX.test(value) || 'Only English letters and "-" are allowed',
            firstUppercase: (value) =>
              FIRST_LETTER_UPPERCASE_REGEX.test(value) || 'First letter must be uppercase',
          },
        })}
        error={errors.lastName?.message}
      />

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

      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
