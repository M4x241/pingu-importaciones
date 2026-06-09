import { api } from './api';
import type { PaymentResult } from '../types';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

export interface CreateOrderPayload {
  items: { product_id: number; nombre: string; cantidad: number; precio_unitario: number }[];
  total: number;
  moneda: string;
}

export interface PayPalOrderResponse {
  id: string;
  status: string;
  links: { href: string; rel: string; method: string }[];
}

export const paypalService = {
  getClientId(): string {
    return PAYPAL_CLIENT_ID;
  },

  isConfigured(): boolean {
    return PAYPAL_CLIENT_ID.length > 0;
  },

  async createOrder(data: CreateOrderPayload): Promise<PayPalOrderResponse> {
    return api.post<PayPalOrderResponse>('/api/paypal/create-order', data);
  },

  async captureOrder(orderId: string): Promise<PaymentResult> {
    return api.post<PaymentResult>('/api/paypal/capture-order', { orderId });
  },

  async cancelOrder(orderId: string): Promise<void> {
    return api.post<void>('/api/paypal/cancel-order', { orderId });
  },
};
