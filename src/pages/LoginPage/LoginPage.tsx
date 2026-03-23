import { useNavigate } from 'react-router-dom';

import LoginForm from '@/components/forms/LoginForm/LoginForm';

import type { LoginFormInputs } from '@/ts/interfaces';

import { useLogin } from '@/hooks/useLogin';

import { ROUTES } from '@/constants';

export default function LoginPage() {
  const { loginAccount } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormInputs) => {
    await loginAccount(data);
    void navigate(ROUTES.HOME);
  };

  return <LoginForm onSubmit={handleLogin} />;
}
