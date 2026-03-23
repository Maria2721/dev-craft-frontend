import type { AxiosRequestConfig } from 'axios';

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

interface UserResponse {
  id: number;
  email: string;
  name: string;
  surname: string;
  createdAt: string;
}

interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void | Promise<void>;
}

export type {
  ApiError,
  AuthResponse,
  AuthState,
  CustomAxiosRequestConfig,
  LoginFormInputs,
  LoginFormProps,
  RefreshResponse,
  RegisterFormInputs,
  RegisterFormProps,
};
