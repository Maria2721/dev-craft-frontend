// types.ts
interface AuthState {
  isAuthenticated: boolean;
}

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormInputs) => void | Promise<void>;
}

export type { AuthState, RegisterFormInputs, RegisterFormProps };
