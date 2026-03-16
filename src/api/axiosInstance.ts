import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { getAccessToken, getRefreshToken, saveTokens } from '@/utils/tokenStorage';

import type { CustomAxiosRequestConfig, RefreshResponse } from '@/ts/interfaces';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        const response = await axios.post<RefreshResponse>('/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefresh } = response.data;

        saveTokens(accessToken, newRefresh);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(
          refreshError instanceof Error ? refreshError : new Error(String(refreshError)),
        );
      }
    }

    return Promise.reject(error);
  },
);
