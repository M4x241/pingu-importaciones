import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, BarChart3, Settings, ShoppingBag, TrendingUp, DollarSign, Clock, ChevronDown, Search, Plus, MoreHorizontal } from 'lucide-react';
import { usuariosService } from '../services/usuarios';
import { reservacionesService, type ReservacionConDetalles } from '../services/reservaciones';
import type { User } from '../types';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'usuarios', label: 'Usuarios', icon: Users },
  { id: 'productos', label: 'Productos', icon: Package },
  { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag },
  { id: 'grupos', label: 'Grupos', icon: TrendingUp },
  { id: 'reportes', label: 'Reportes', icon: Clock },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  pendiente: { label: 'Pendiente', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  confirmada: { label: 'Confirmada', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  en_camino: { label: 'En Camino', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  entregada: { label: 'Entregada', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  cancelada: { label: 'Cancelada', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [reservaciones, setReservaciones] = useState<ReservacionConDetalles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      usuariosService.getAll().catch(() => [] as User[]),
      reservacionesService.getAll().catch(() => [] as ReservacionConDetalles[]),
    ])
      .then(([u, r]) => { setUsers(u); setReservaciones(r); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <div className="flex">
        <aside
          className="w-64 min-h-screen hidden lg:block p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <Link to="/" className="flex items-center gap-2 px-4 py-6 mb-4">
            <span className="text-2xl">🐧</span>
            <span className="text-lg font-bold text-white">
              Pingu <span className="text-amber">Admin</span>
            </span>
          </Link>

          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: activeTab === item.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: activeTab === item.id ? '#FCD34D' : 'rgba(203, 213, 225, 0.7)',
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate hover:text-white transition-colors"
            >
              ← Volver al Sitio
            </Link>
          </div>
        </aside>

        <div className="flex-1 p-6 lg:p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                Panel de Administración
              </h1>
              <p className="text-slate text-sm">Gestiona tu plataforma de importaciones</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50 w-48 lg:w-64"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </div>
              <button className="flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 text-sm whitespace-nowrap">
                <Plus className="w-4 h-4" />
                Nuevo Producto
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: DollarSign, label: 'Ventas Totales', value: '$0', change: '—', color: '#22C55E' },
                  { icon: ShoppingBag, label: 'Pedidos', value: String(reservaciones.length), change: '—', color: '#3B82F6' },
                  { icon: Users, label: 'Usuarios', value: String(users.length), change: '—', color: '#8B5CF6' },
                  { icon: Package, label: 'Productos', value: '—', change: '—', color: '#F59E0B' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 space-y-3"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                  >
                    <div className="flex items-center justify-between">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.change}</span>
                    </div>
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-xs text-slate">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Ingresos Mensuales</h3>
                  <div className="h-48 flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '0.75rem' }}>
                    <div className="flex items-end gap-3 h-32">
                      {[40, 60, 45, 80, 55, 90, 70, 85, 65, 95, 75, 100].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className="w-6 rounded-full transition-all duration-500 hover:opacity-80"
                            style={{
                              height: `${h * 0.32}px`,
                              background: `linear-gradient(180deg, #F59E0B, ${i % 2 === 0 ? '#D97706' : '#B45309'})`,
                            }}
                          />
                          <span className="text-[10px] text-slate/50">{['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Grupos Activos</h3>
                  <div className="space-y-4">
                    {reservaciones.filter(r => r.estado === 'pendiente' || r.estado === 'confirmada').slice(0, 3).length === 0 ? (
                      <p className="text-slate text-sm">No hay grupos activos.</p>
                    ) : (
                      reservaciones.filter(r => r.estado === 'pendiente' || r.estado === 'confirmada').slice(0, 3).map((res) => (
                        <div key={res.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white font-medium">{res.codigo_unico}</span>
                            <span className="text-amber font-semibold">—</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: '50%',
                                background: 'linear-gradient(90deg, #F59E0B, #D97706)',
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-slate">
                            <span>{res.detalleReservaciones?.length || 0} productos</span>
                            <span className="text-amber font-medium">{res.estado}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Pedidos Recientes</h3>
                  <button className="flex items-center gap-1 text-sm text-amber hover:text-amber-light transition-colors">
                    Ver Todos
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate text-left">
                        <th className="pb-4 font-medium">Pedido</th>
                        <th className="pb-4 font-medium">Cliente</th>
                        <th className="pb-4 font-medium hidden md:table-cell">Productos</th>
                        <th className="pb-4 font-medium">Fecha</th>
                        <th className="pb-4 font-medium">Estado</th>
                        <th className="pb-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservaciones.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate">No hay pedidos registrados.</td>
                        </tr>
                      ) : (
                        reservaciones.slice(0, 5).map((res) => (
                          <tr key={res.id} className="border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                            <td className="py-4 text-white font-medium">{res.codigo_unico}</td>
                            <td className="py-4 text-slate">{res.user?.nombres || `ID:${res.user_id}`} {res.user?.apellidos || ''}</td>
                            <td className="py-4 text-slate hidden md:table-cell">{res.detalleReservaciones?.length || 0} productos</td>
                            <td className="py-4 text-slate">{new Date(res.fecha_reservacion).toLocaleDateString()}</td>
                            <td className="py-4">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{
                                  background: statusStyles[res.estado]?.bg,
                                  color: statusStyles[res.estado]?.color,
                                }}
                              >
                                {statusStyles[res.estado]?.label || res.estado}
                              </span>
                            </td>
                            <td className="py-4">
                              <button className="text-slate hover:text-white transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
