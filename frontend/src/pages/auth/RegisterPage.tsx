import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Building2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ nombres: '', apellidos: '', email: '', password: '', confirmPassword: '', role: 'cliente' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await register({ nombres: form.nombres, apellidos: form.apellidos, email: form.email, password: form.password, role: form.role });
      const stored = localStorage.getItem('user');
      const u = stored ? JSON.parse(stored) : null;
      navigate(u?.role === 'empresa' ? '/business' : u?.role === 'cliente' ? '/client' : '/');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center !px-6 !py-24" style={{ backgroundColor: '#0F172A' }}>
      <div className="w-full !max-w-md">
        <div className="text-center !mb-8">
          <Link to="/" className="inline-flex items-center gap-2 !mb-6">
            <span className="text-4xl">🐧</span>
            <span className="text-2xl font-bold text-white">
              Pingu <span className="text-amber">Importaciones</span>
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Únete a la <span className="text-amber">Colonia</span>
          </h1>
          <p className="text-slate !mt-2">Crea tu cuenta y empieza a ahorrar</p>
        </div>

        <div
          className="rounded-2xl !p-8 !space-y-6"
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

          <form onSubmit={handleSubmit} className="!space-y-5">
            <div className="grid grid-cols-2 !gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-light">Nombres</label>
                <input
                  type="text"
                  name="nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  placeholder="Juan"
                  required
                  className="w-full !px-4 !py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-light">Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  placeholder="Pérez"
                  required
                  className="w-full !px-4 !py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-light">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  required
                  className="w-full !pl-12 !pr-4 !py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </div>
            </div>

            <div className="!space-y-2">
              <label className="text-sm font-medium text-slate-light">Tipo de Cuenta</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'cliente', label: 'Cliente', icon: ShoppingBag },
                  { value: 'empresa', label: 'Empresa', icon: Building2 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, role: opt.value }))}
                    className="flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-medium transition-all duration-300"
                    style={{
                      background: form.role === opt.value ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                      border: `1px solid ${form.role === opt.value ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: form.role === opt.value ? '#FCD34D' : 'rgba(203, 213, 225, 0.6)',
                    }}
                  >
                    <opt.icon className="w-5 h-5" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="!space-y-2">
              <label className="text-sm font-medium text-slate-light">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full !pl-12 !pr-12 !py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
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

            <div className="!space-y-2">
              <label className="text-sm font-medium text-slate-light">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full !pl-12 !pr-4 !py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 !bg-amber hover:bg-amber-dark text-oxford font-bold !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 text-base"
              style={{ boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)' }}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Crear Cuenta
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate !mt-8">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-amber hover:text-amber-light font-semibold transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
