import { apiClient } from './client';

export const authApi = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }).then((r) => r.data),
  register: (payload) => apiClient.post('/auth/register', payload).then((r) => r.data),
  refresh: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }).then((r) => r.data),
  me: () => apiClient.get('/user/me').then((r) => r.data),
};
