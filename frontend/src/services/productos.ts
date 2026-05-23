import { api } from './api';
import type { Product } from '../types';

export const productosService = {
  getAll: (catalogo_id?: number) => {
    const params = catalogo_id ? `?catalogo_id=${catalogo_id}` : '';
    return api.get<Product[]>(`/api/productos${params}`);
  },

  getFeatured: () => api.get<Product[]>('/api/productos/destacados'),

  getById: (id: number) => api.get<Product>(`/api/productos/${id}`),

  create: (data: Partial<Product>) => api.post<Product>('/api/productos', data),

  update: (id: number, data: Partial<Product>) =>
    api.put<Product>(`/api/productos/${id}`, data),

  delete: (id: number) => api.delete<void>(`/api/productos/${id}`),
};
