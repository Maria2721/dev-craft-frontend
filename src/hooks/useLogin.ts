import axios from 'axios';

import { login } from '@/redux/slices/authSlice';

import { toastError, toastLoading, toastSuccess } from '@/utils/toast';
import { saveTokens } from '@/utils/tokenStorage';

import type { ApiError, LoginFormInputs } from '@/ts/interfaces';

import { loginUser } from '@/api/authApi';

import { useAppDispatch } from './useRedux';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const loginAccount = async (data: LoginFormInputs) => {
    const toastId = toastLoading('Trying to login...');

    try {
      const response = await loginUser(data);

      saveTokens(response.accessToken, response.refreshToken);

      dispatch(login());

      toastSuccess(toastId, 'Login successful 🎉');

      return response.user;
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        toastError(toastId, error.response?.data?.message || 'Login failed');
      } else {
        toastError(toastId, 'Unexpected error occurred');
      }

      throw error;
    }
  };

  return { loginAccount };
};
