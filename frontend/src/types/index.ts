export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_minima: number;
  cantidad_maxima: number;
  imagen_url: string;
  catalogo_id: number;
  categoria?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  featured?: boolean;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  role: 'admin' | 'empresa' | 'cliente';
}

export interface Empresa {
  id: number;
  nombre: string;
  nit: string;
  telefono: string;
  direccion: string;
  user_id: number;
}

export interface Catalogo {
  id: number;
  empresa_id: number;
  titulo: string;
  descripcion: string;
  fecha_creacion: string;
  estado: string;
  fecha_finalizacion: string;
}

export interface Reservacion {
  id: number;
  user_id: number;
  codigo_unico: string;
  fecha_reservacion: string;
  estado: 'pendiente' | 'confirmada' | 'en_camino' | 'entregada' | 'cancelada';
}

export interface DetalleReservacion {
  id: number;
  reservacion_id: number;
  product_id: number;
  cantidad_pedida: number;
  precio_unitario: number;
}

export interface Order {
  id: number;
  codigo: string;
  fecha: string;
  total: number;
  estado: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen: string;
}

export interface PayPalConfig {
  clientId: string;
  currency: string;
  intent: 'capture' | 'authorize';
}

export interface PaymentResult {
  status: 'completed' | 'failed' | 'pending';
  transactionId?: string;
  payerEmail?: string;
  error?: string;
}
