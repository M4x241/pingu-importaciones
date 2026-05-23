import { api } from './api';
import type { Catalogo } from '../types';

export const catalogosService = {
  getAll: () => api.get<Catalogo[]>('/api/catalogos'),
  getById: (id: number) => api.get<Catalogo>(`/api/catalogos/${id}`),
  create: (data: Partial<Catalogo>) =>
    api.post<Catalogo>('/api/catalogos', data),
  update: (id: number, data: Partial<Catalogo>) =>
    api.put<Catalogo>(`/api/catalogos/${id}`, data),
  delete: (id: number) => api.delete<void>(`/api/catalogos/${id}`),
};
