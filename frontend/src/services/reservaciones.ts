import { api } from './api';
import type { Reservacion, DetalleReservacion } from '../types';

export interface ReservacionConDetalles extends Reservacion {
  detalleReservaciones: (DetalleReservacion & {
    producto?: { id: number; nombre: string; imagen_url: string; precio: number };
  })[];
  user?: { id: number; nombres: string; apellidos: string; email: string };
}

export const reservacionesService = {
  getAll: (user_id?: number, empresa_id?: number) => {
    const params = new URLSearchParams();
    if (user_id) params.set('user_id', String(user_id));
    if (empresa_id) params.set('empresa_id', String(empresa_id));
    const qs = params.toString();
    return api.get<ReservacionConDetalles[]>(`/api/reservaciones${qs ? '?' + qs : ''}`);
  },

  getById: (id: number) =>
    api.get<ReservacionConDetalles>(`/api/reservaciones/${id}`),

  create: (data: Partial<Reservacion>) =>
    api.post<Reservacion>('/api/reservaciones', data),

  update: (id: number, data: Partial<Reservacion>) =>
    api.put<Reservacion>(`/api/reservaciones/${id}`, data),

  delete: (id: number) => api.delete<void>(`/api/reservaciones/${id}`),
};
