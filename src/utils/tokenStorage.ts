const getAccessToken = () => localStorage.getItem('accessToken');

const getRefreshToken = () => localStorage.getItem('refreshToken');

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export { clearTokens, getAccessToken, getRefreshToken, saveTokens };
