import type { AuthResponse, RegisterFormInputs } from '@/ts/interfaces';

import { api } from './axiosInstance';

export const registerUser = async (data: RegisterFormInputs): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', {
    email: data.email,
    password: data.password,
    name: data.firstName,
    surname: data.lastName,
  });

  return response.data;
};
