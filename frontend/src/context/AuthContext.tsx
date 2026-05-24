import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { nombres: string; apellidos: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const stored = localStorage.getItem('user');
    if (token && stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      localStorage.setItem('access_token', res.access_token);
      const u: User = {
        id: res.user.id,
        nombres: res.user.nombres,
        apellidos: res.user.apellidos,
        email: res.user.email,
        role: res.user.role as User['role'],
        // empresas: res.user.empresas || [],
      };
      localStorage.setItem('user', JSON.stringify(u));
      setUser(u);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: { nombres: string; apellidos: string; email: string; password: string; role: string }) => {
    setLoading(true);
    try {
      const roleMap: Record<string, number> = { admin: 1, empresa: 2, cliente: 3 };
      const res = await authService.register({
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        password: data.password,
        role_id: roleMap[data.role] || 3,
      });
      localStorage.setItem('access_token', res.access_token);
      const u: User = {
        id: res.user.id,
        nombres: res.user.nombres,
        apellidos: res.user.apellidos,
        email: res.user.email,
        role: res.user.role as User['role'],
        // empresas: res.user.empresas || [],
      };
      localStorage.setItem('user', JSON.stringify(u));
      setUser(u);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
