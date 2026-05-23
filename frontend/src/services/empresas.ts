import { api } from './api';
import type { Empresa } from '../types';

export const empresasService = {
  getAll: () => api.get<Empresa[]>('/api/empresas'),
  getById: (id: number) => api.get<Empresa>(`/api/empresas/${id}`),
  create: (data: Partial<Empresa>) => api.post<Empresa>('/api/empresas', data),
  update: (id: number, data: Partial<Empresa>) =>
    api.put<Empresa>(`/api/empresas/${id}`, data),
  delete: (id: number) => api.delete<void>(`/api/empresas/${id}`),
};
