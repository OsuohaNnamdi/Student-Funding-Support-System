import { apiClient } from './client';

function jsonPart(payload) {
  return new Blob([JSON.stringify(payload)], { type: 'application/json' });
}

export const scholarshipApi = {
  list: () => apiClient.get('/services/scholarship/sponsorships').then((r) => r.data),
  get: (id) => apiClient.get(`/services/scholarship/sponsorships/${id}`).then((r) => r.data),
  add: (payload, logoFile) => {
    const formData = new FormData();
    formData.append('sponsorship', jsonPart(payload));
    if (logoFile) formData.append('logo', logoFile);
    // No explicit Content-Type here: the browser/axios must generate the
    // multipart boundary itself. Setting 'multipart/form-data' by hand
    // strips that boundary and the server can't parse the parts.
    return apiClient.post('/services/scholarship/sponsorships', formData).then((r) => r.data);
  },
  update: (id, payload) => apiClient.put(`/services/scholarship/sponsorships/${id}`, payload).then((r) => r.data),
  remove: (id) => apiClient.delete(`/services/scholarship/sponsorships/${id}`).then((r) => r.data),
};
