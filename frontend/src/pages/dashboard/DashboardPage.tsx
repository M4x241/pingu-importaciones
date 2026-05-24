import { useState, useEffect } from 'react';
import { User, Package, Heart, Settings, LogOut, MapPin, CreditCard, Clock, ShoppingBag, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { reservacionesService, type ReservacionConDetalles } from '../../services/reservaciones';

const tabs = [
  { id: 'resumen', label: 'Resumen', icon: User },
  { id: 'pedidos', label: 'Mis Pedidos', icon: Package },
  { id: 'reservaciones', label: 'Reservaciones', icon: Clock },
  { id: 'favoritos', label: 'Favoritos', icon: Heart },
  { id: 'direcciones', label: 'Direcciones', icon: MapPin },
  { id: 'pagos', label: 'Métodos de Pago', icon: CreditCard },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  entregada: { label: 'Entregada', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  en_camino: { label: 'En Camino', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  pendiente: { label: 'Pendiente', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  confirmada: { label: 'Confirmada', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  cancelada: { label: 'Cancelada', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('resumen');
  const { user, logout } = useAuth();
  const [reservaciones, setReservaciones] = useState<ReservacionConDetalles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    reservacionesService
      .getAll(user.id)
      .then(setReservaciones)
      .catch(() => setReservaciones([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const activas = reservaciones.filter((r) => r.estado === 'reservado' || r.estado === 'entregado' || r.estado === 'importando');
  const favoritosCount = 0;

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <div className="w-full mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(245, 158, 11, 0.1)' }}
            >
              🐧
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                Hola, {user?.nombres || 'Usuario'}
              </h1>
              <p className="text-slate text-sm">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate hover:text-red-400 transition-colors px-4 py-2 rounded-xl"
            style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div
            className="rounded-2xl p-4 space-y-1 lg:col-span-1"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: activeTab === tab.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: activeTab === tab.id ? '#FCD34D' : 'rgba(203, 213, 225, 0.7)',
                }}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-amber' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
              </div>
            ) : activeTab === 'resumen' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Package, label: 'Pedidos Activos', value: String(activas.length), color: '#F59E0B' },
                    { icon: Clock, label: 'Reservaciones', value: String(reservaciones.length), color: '#3B82F6' },
                    { icon: Heart, label: 'Favoritos', value: String(favoritosCount), color: '#EF4444' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-6 space-y-3"
                      style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                    >
                      <div className="flex items-center justify-between">
                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                        <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                      </div>
                      <p className="text-sm text-slate">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-6 space-y-4"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Reservaciones Recientes</h2>
                    <button onClick={() => setActiveTab('pedidos')} className="text-sm text-amber hover:text-amber-light transition-colors">
                      Ver todas
                    </button>
                  </div>
                  {reservaciones.length === 0 ? (
                    <p className="text-slate text-sm py-4">No tienes reservaciones aún.</p>
                  ) : (
                    <div className="space-y-3">
                      {reservaciones.slice(0, 3).map((res) => (
                        <div
                          key={res.id}
                          className="flex items-center justify-between p-4 rounded-xl"
                          style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-white">{res.codigo_unico}</p>
                            <p className="text-xs text-slate">{new Date(res.fecha_reservacion).toLocaleDateString()} · {res.detalleReservaciones?.length || 0} productos</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className="text-xs font-semibold px-3 py-1 rounded-full"
                              style={{
                                background: statusConfig[res.estado]?.bg,
                                color: statusConfig[res.estado]?.color,
                              }}
                            >
                              {statusConfig[res.estado]?.label || res.estado}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : activeTab === 'pedidos' || activeTab === 'reservaciones' ? (
              <div
                className="rounded-2xl p-6 space-y-4"
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <h2 className="text-lg font-bold text-white">Todas las Reservaciones</h2>
                {reservaciones.length === 0 ? (
                  <p className="text-slate text-sm py-4">No hay reservaciones registradas.</p>
                ) : (
                  <div className="space-y-3">
                    {reservaciones.map((res) => (
                      <div
                        key={res.id}
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-white">{res.codigo_unico}</p>
                          <p className="text-xs text-slate">{new Date(res.fecha_reservacion).toLocaleDateString()} · {res.detalleReservaciones?.length || 0} productos</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                              background: statusConfig[res.estado]?.bg,
                              color: statusConfig[res.estado]?.color,
                            }}
                          >
                            {statusConfig[res.estado]?.label || res.estado}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4"
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <ShoppingBag className="w-16 h-16 text-white/10" />
                <h3 className="text-xl font-bold text-white">Próximamente</h3>
                <p className="text-slate/50 text-sm max-w-md">
                  Esta sección estará disponible en la próxima actualización. Estamos trabajando para traerte la mejor experiencia.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
