import { api } from './api';
import type { Product } from '../types';

export const productosService = {
  getAll: (catalogo_id?: number, empresa_id?: number) => {
    const params = new URLSearchParams();
    if (catalogo_id) params.set('catalogo_id', String(catalogo_id));
    if (empresa_id) params.set('empresa_id', String(empresa_id));
    const qs = params.toString();
    return api.get<Product[]>(`/api/productos${qs ? '?' + qs : ''}`);
  },

  getFeatured: () => api.get<Product[]>('/api/productos/destacados'),

  getById: (id: number) => api.get<Product>(`/api/productos/${id}`),

  create: (data: Partial<Product>) => api.post<Product>('/api/productos', data),

  update: (id: number, data: Partial<Product>) =>
    api.put<Product>(`/api/productos/${id}`, data),

  delete: (id: number) => api.delete<void>(`/api/productos/${id}`),
};
