import { api } from './api';
import type { User } from '../types';

export const usersService = {
  updateProfile: (id: number, data: Partial<Pick<User, 'nombres' | 'apellidos' | 'email'> & { password: string }>) =>
    api.put<User>(`/api/users/${id}`, data),
};
