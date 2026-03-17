import { useNavigate } from 'react-router-dom';

import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';

import type { RegisterFormInputs } from '@/ts/interfaces';

import { useRegister } from '@/hooks/useRegister';

import { ROUTES } from '@/constants';

export default function RegisterPage() {
  const { register } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormInputs) => {
    await register(data);
    void navigate(ROUTES.HOME);
  };

  return <RegisterForm onSubmit={handleRegister} />;
}
