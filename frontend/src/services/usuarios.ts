import { api } from './api';
import type { User } from '../types';

export const usuariosService = {
  getAll: () => api.get<User[]>('/api/users'),
  getById: (id: number) => api.get<User>(`/api/users/${id}`),
  create: (data: Partial<User>) => api.post<User>('/api/users', data),
};
