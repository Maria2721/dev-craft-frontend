import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';

import type { RegisterFormInputs } from '@/ts/interfaces';

import { useRegister } from '@/hooks/useRegister';

export default function RegisterPage() {
  const { register } = useRegister();

  const handleRegister = async (data: RegisterFormInputs) => {
    await register(data);
  };

  return <RegisterForm onSubmit={handleRegister} />;
}
