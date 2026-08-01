import { apiClient } from './client';

export const accessApi = {
  requestAccess: (payload) => apiClient.post('/user/access-requests', payload).then((r) => r.data),
  listMyRequests: () => apiClient.get('/user/access-requests').then((r) => r.data),
  listMyGrants: () => apiClient.get('/user/access-grants').then((r) => r.data),

  listPending: (page = 0, size = 20) =>
    apiClient.get('/admin/access-requests', { params: { page, size } }).then((r) => r.data),
  decide: (id, decision) => apiClient.patch(`/admin/access-requests/${id}`, { decision }).then((r) => r.data),
};
