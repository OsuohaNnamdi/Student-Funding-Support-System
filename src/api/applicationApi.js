import { apiClient } from './client';

function jsonPart(payload) {
  return new Blob([JSON.stringify(payload)], { type: 'application/json' });
}

export const applicationApi = {
  listMine: () => apiClient.get('/services/scholarship/applications/me').then((r) => r.data),
  listAll: () => apiClient.get('/services/scholarship/applications').then((r) => r.data),
  submit: (payload, doc1, doc2) => {
    const formData = new FormData();
    formData.append('application', jsonPart(payload));
    if (doc1) formData.append('doc1', doc1);
    if (doc2) formData.append('doc2', doc2);
    // No explicit Content-Type here — see the note in scholarshipApi.add.
    return apiClient.post('/services/scholarship/applications', formData).then((r) => r.data);
  },
  approve: (id) => apiClient.patch(`/services/scholarship/applications/${id}/approve`).then((r) => r.data),
  reject: (id) => apiClient.patch(`/services/scholarship/applications/${id}/reject`).then((r) => r.data),
  remove: (id) => apiClient.delete(`/services/scholarship/applications/${id}`).then((r) => r.data),
};
