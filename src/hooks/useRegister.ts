import axios from 'axios';

import { login } from '@/redux/slices/authSlice';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';
import { saveTokens } from '@/utils/tokenStorage';

import type { ApiError, RegisterFormInputs } from '@/ts/interfaces';

import { registerUser } from '@/api/authApi';

import { useAppDispatch } from './useRedux';

export const useRegister = () => {
  const dispatch = useAppDispatch();

  const register = async (data: RegisterFormInputs) => {
    const toastId = toastLoading('Creating account...');

    try {
      const response = await registerUser(data);

      saveTokens(response.accessToken, response.refreshToken);

      dispatch(login());

      toastSuccess(toastId, 'Account created successfully 🎉');

      return response.user;
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        toastError(toastId, error.response?.data?.message || 'Registration failed');
      } else {
        toastError(toastId, 'Unexpected error occurred');
      }

      throw error;
    }
  };

  return { register };
};
