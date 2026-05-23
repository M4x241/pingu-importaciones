import { api } from './api';

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    role: string;
  };
}

export interface RegisterPayload {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  role_id: number;
}

export const authService = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>('/api/auth/login', { email, password }),

  register: (data: RegisterPayload) =>
    api.post<LoginResponse>('/api/auth/register', data),
};
