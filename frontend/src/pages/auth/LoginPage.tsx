import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24" style={{ backgroundColor: '#0F172A' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-4xl">🐧</span>
            <span className="text-2xl font-bold text-white">
              Pingu <span className="text-amber">Importaciones</span>
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Bienvenido de <span className="text-amber">Vuelta</span>
          </h1>
          <p className="text-slate mt-2">Ingresa a tu cuenta para continuar</p>
        </div>

        <div
          className="rounded-2xl p-8 space-y-6"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {error && (
            <div className="p-4 rounded-xl text-sm font-medium" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-light">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-light">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-amber" style={{ accentColor: '#F59E0B' }} />
                <span className="text-sm text-slate">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-amber hover:text-amber-light transition-colors">¿Olvidaste tu contraseña?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 text-base"
              style={{ boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)' }}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{ background: '#0F172A', color: 'rgba(203, 213, 225, 0.5)' }}>
                o continúa con
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(203, 213, 225, 0.8)' }}
            >
              <User className="w-5 h-5" />
              Demo Cliente
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', color: '#FCD34D' }}
            >
              <User className="w-5 h-5" />
              Demo Admin
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate mt-8">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-amber hover:text-amber-light font-semibold transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
