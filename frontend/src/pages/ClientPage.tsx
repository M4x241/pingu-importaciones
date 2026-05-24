import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, ShoppingBag, Clock, CheckCircle, AlertCircle, Truck, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { reservacionesService, type ReservacionConDetalles } from '../services/reservaciones';

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  reservado: { label: 'Reservado', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  entregado: { label: 'Entregado', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  importando: { label: 'Importando', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
};

export default function ClientPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [reservaciones, setReservaciones] = useState<ReservacionConDetalles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'cliente') {
      navigate('/login');
      return;
    }
    setLoading(true);
    reservacionesService.getAll()
      .then(setReservaciones)
      .catch(() => setReservaciones([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated, user, navigate]);

  const totalReservaciones = reservaciones.length;
  const entregadas = reservaciones.filter((r) => r.estado === 'entregado').length;
  const pendientes = reservaciones.filter((r) => r.estado === 'reservado' || r.estado === 'importando').length;
  const totalGastado = reservaciones
    .filter((r) => r.estado === 'entregado')
    .reduce((sum, r) => {
      const detalles = r.detalleReservaciones || [];
      return sum + detalles.reduce((sub, d) => sub + d.cantidad_pedida * d.precio_unitario, 0);
    }, 0);

  if (!isAuthenticated || user?.role !== 'cliente') return null;

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <div className="w-full !mx-auto !px-6 !py-8 !pt-18">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 !mb-10">
          <div>
            <h1 className="text-4xl !md:text-3xl font-extrabold text-white tracking-tight">
              Hola, <span className="text-amber">{user?.nombres}</span>
            </h1>
            <p className="text-slate text-sm !mt-1">Bienvenido a tu panel de cliente</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/tienda"
              className="flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold !px-5 !py-2.5 rounded-xl transition-all text-sm">
              <ShoppingBag className="w-4 h-4" />
              Seguir Comprando
            </Link>
            <button onClick={function() { logout(); navigate('/'); }}
              className="flex items-center gap-2 !px-4 !py-2.5 rounded-xl text-sm text-slate hover:text-red-400 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>

        <div className="!grid !grid-cols-2 !sm:grid-cols-2 !lg:grid-cols-4 !gap-4 !mb-8 ">
          {[
            { icon: ShoppingBag, label: 'Reservaciones', value: String(totalReservaciones), color: '#3B82F6' },
            { icon: CheckCircle, label: 'Entregadas', value: String(entregadas), color: '#22C55E' },
            { icon: Clock, label: 'Pendientes', value: String(pendientes), color: '#F59E0B' },
            { icon: Truck, label: 'Total Gastado', value: 'Bs ' + totalGastado.toFixed(2), color: '#8B5CF6' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl !p-5 !space-y-3 " style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="flex items-center justify-between">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl !p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="flex items-center justify-between !mb-6">
            <h3 className="text-xl font-bold text-white">Mis Reservaciones</h3>
            {reservaciones.length > 0 && (
              <span className="text-xs text-slate">{reservaciones.length} reservaciones</span>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center !py-12">
              <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reservaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center !py-12 !space-y-4">
              <Package className="w-16 h-16 text-white/10" />
              <p className="text-white/50 text-lg font-medium">No tienes reservaciones aun</p>
              <p className="text-slate/30 text-sm">Explora la tienda y encuentra productos para importar</p>
              <Link to="/tienda"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold !px-6 !py-3 rounded-xl transition-all text-sm !mt-2">
                Ir a la Tienda
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate text-left">
                    <th className="pb-4 font-medium">Codigo</th>
                    <th className="pb-4 font-medium">Fecha</th>
                    <th className="pb-4 font-medium hidden md:table-cell">Productos</th>
                    <th className="pb-4 font-medium hidden md:table-cell">Total</th>
                    <th className="pb-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reservaciones.map((res) => {
                    const detalles = res.detalleReservaciones || [];
                    const total = detalles.reduce((sum, d) => sum + d.cantidad_pedida * d.precio_unitario, 0);
                    const nombres = detalles.map(function(d) { return d.producto?.nombre || 'Producto #' + d.product_id; }).join(', ');
                    return (
                      <tr key={res.id} className="!border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                        <td className="!py-4 text-white font-mono text-lg">{res.codigo_unico}</td>
                        <td className="!py-4 text-slate text-lg">{new Date(res.fecha_reservacion).toLocaleDateString()}</td>
                        <td className="!py-4 text-slate text-lg hidden md:table-cell max-w-[200px] truncate">{nombres}</td>
                        <td className="!py-4 text-amber font-bold hidden md:table-cell">${total.toFixed(2)}</td>
                        <td className="!py-4">
                          <span className="text-xs font-semibold !px-3 !py-1 rounded-full"
                            style={{ background: statusStyles[res.estado]?.bg || 'rgba(255,255,255,0.05)', color: statusStyles[res.estado]?.color || '#94A3B8' }}>
                            {statusStyles[res.estado]?.label || res.estado}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="!grid !grid-cols-1 sm:grid-cols-3 !gap-4 !mt-8">
          <Link to="/tienda"
            className="flex items-center justify-between !p-5 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-amber" />
              <div>
                <p className="text-xl font-semibold text-white">Explorar Tienda</p>
                <p className="text-xs text-slate">Descubre nuevos productos</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber" />
          </Link>

          <Link to="/"
            className="flex items-center justify-between !p-5 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-xl font-semibold text-white">Inicio</p>
                <p className="text-xs text-slate">Volver al sitio principal</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate" />
          </Link>

          <div className="flex items-center justify-between !p-5 rounded-2xl"
            style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-xl font-semibold text-white">Ayuda</p>
                <p className="text-xs text-slate">Soporte al cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
