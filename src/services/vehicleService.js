import api from './api';

export const vehicleService = {
  getAll: () => api.get('/vehicle'),
  getById: (id) => api.get(`/vehicle/${id}`),
  create: (data) => api.post('/vehicle', data),
  update: (id, data) => api.put(`/vehicle/${id}`, data),
  delete: (id) => api.delete(`/vehicle/${id}`),
};