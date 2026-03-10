import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';

import type { RegisterFormInputs } from '@/ts/interfaces';

export default function RegisterPage() {
  const handleRegister = (data: RegisterFormInputs) => {
    console.log('FORM DATA:', data);
    // await registerUser(data)
  };
  return <RegisterForm onSubmit={handleRegister} />;
}
