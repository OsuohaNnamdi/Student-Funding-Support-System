import { apiClient } from './client';

export const fundApi = {
  list: () => apiClient.get('/services/scholarship/funds').then((r) => r.data),
  add: (payload) => apiClient.post('/services/scholarship/funds', payload).then((r) => r.data),
  update: (id, payload) => apiClient.put(`/services/scholarship/funds/${id}`, payload).then((r) => r.data),
  remove: (id) => apiClient.delete(`/services/scholarship/funds/${id}`).then((r) => r.data),
};
