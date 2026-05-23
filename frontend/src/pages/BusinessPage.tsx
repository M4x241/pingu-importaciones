import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, BarChart3, Settings, ShoppingBag, Users, Plus, Search, TrendingUp, DollarSign, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { productosService } from '../services/productos';
import { empresasService } from '../services/empresas';
import { catalogosService } from '../services/catalogos';
import type { Product, Empresa, Catalogo } from '../types';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'catalogos', label: 'Catálogos', icon: ShoppingBag },
  { id: 'productos', label: 'Productos', icon: Package },
  { id: 'grupos', label: 'Grupos', icon: TrendingUp },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'reportes', label: 'Reportes', icon: Clock },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

const _statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  activo: { label: 'Activo', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  pausado: { label: 'Pausado', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  agotado: { label: 'Agotado', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productos, setProductos] = useState<Product[]>([]);
  const [_empresas, setEmpresas] = useState<Empresa[]>([]);
  const [catalogos, setCatalogos] = useState<Catalogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productosService.getAll().catch(() => [] as Product[]),
      empresasService.getAll().catch(() => [] as Empresa[]),
      catalogosService.getAll().catch(() => [] as Catalogo[]),
    ])
      .then(([p, e, c]) => { setProductos(p); setEmpresas(e); setCatalogos(c); })
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
              Pingu <span className="text-amber">Empresas</span>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                Panel de Empresa
              </h1>
              <p className="text-slate text-sm">Gestiona tus productos y grupos de importación</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50 w-full sm:w-56"
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
                  { icon: DollarSign, label: 'Ventas del Mes', value: '$0', change: '—', color: '#22C55E' },
                  { icon: Package, label: 'Productos', value: String(productos.length), change: '—', color: '#3B82F6' },
                  { icon: Users, label: 'Compradores', value: '—', change: '—', color: '#8B5CF6' },
                  { icon: TrendingUp, label: 'Catálogos', value: String(catalogos.length), change: '—', color: '#F59E0B' },
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Grupos de Importación</h3>
                    <button className="flex items-center gap-1 text-sm text-amber hover:text-amber-light transition-colors">
                      <Plus className="w-4 h-4" />
                      Nuevo Grupo
                    </button>
                  </div>
                  <div className="space-y-4">
                    {catalogos.length === 0 ? (
                      <p className="text-slate text-sm">No hay catálogos activos.</p>
                    ) : (
                      catalogos.map((cat) => {
                        const progress = Math.min(Math.round(Math.random() * 100), 100);
                        return (
                          <div key={cat.id} className="space-y-2 p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-white">{cat.titulo}</span>
                              <span className="text-xs text-slate">{cat.estado}</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${progress}%`,
                                  background: progress >= 100 ? 'linear-gradient(90deg, #22C55E, #16A34A)' : 'linear-gradient(90deg, #F59E0B, #D97706)',
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate">{cat.descripcion?.slice(0, 30) || ''}</span>
                              <span className={progress >= 100 ? 'text-green-400 font-medium' : 'text-amber font-medium'}>
                                {progress}%
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Plus, label: 'Agregar Producto', desc: 'Nuevo al catálogo', color: '#F59E0B' },
                      { icon: Package, label: 'Crear Grupo', desc: 'Iniciar importación', color: '#3B82F6' },
                      { icon: Users, label: 'Ver Clientes', desc: 'Lista de compradores', color: '#8B5CF6' },
                      { icon: TrendingUp, label: 'Reportes', desc: 'Análisis de ventas', color: '#22C55E' },
                    ].map((action, i) => (
                      <button
                        key={i}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl text-center transition-all duration-300 hover:scale-[1.02] hover:border-amber/30"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${action.color}15` }}
                        >
                          <action.icon className="w-6 h-6" style={{ color: action.color }} />
                        </div>
                        <span className="text-sm font-semibold text-white">{action.label}</span>
                        <span className="text-xs text-slate">{action.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Mis Productos</h3>
                  <button className="flex items-center gap-1 text-sm text-amber hover:text-amber-light transition-colors">
                    <Plus className="w-4 h-4" />
                    Agregar Producto
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate text-left">
                        <th className="pb-4 font-medium">Producto</th>
                        <th className="pb-4 font-medium">Precio</th>
                        <th className="pb-4 font-medium hidden md:table-cell">Catálogo</th>
                        <th className="pb-4 font-medium">Estado</th>
                        <th className="pb-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate">No hay productos registrados.</td>
                        </tr>
                      ) : (
                        productos.map((product) => (
                          <tr key={product.id} className="border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                            <td className="py-4 text-white font-medium">{product.nombre}</td>
                            <td className="py-4 text-amber font-bold">${Number(product.precio).toFixed(2)}</td>
                            <td className="py-4 text-slate hidden md:table-cell">ID: {product.catalogo_id}</td>
                            <td className="py-4">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{
                                  background: 'rgba(34, 197, 94, 0.1)',
                                  color: '#22C55E',
                                }}
                              >
                                Activo
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg text-slate hover:text-amber hover:bg-white/5 transition-all">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg text-slate hover:text-blue-400 hover:bg-white/5 transition-all">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg text-slate hover:text-red-400 hover:bg-white/5 transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
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
