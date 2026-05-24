import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package, BarChart3, Settings, ShoppingBag, Users, Plus, Search,
  TrendingUp, DollarSign, Edit, Trash2, LogOut, X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { productosService } from '../services/productos';
import { empresasService } from '../services/empresas';
import { catalogosService } from '../services/catalogos';
import { reservacionesService, type ReservacionConDetalles } from '../services/reservaciones';
import { api } from '../services/api';
import type { Product, Empresa, Catalogo, Categoria } from '../types';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'catalogos', label: 'Catalogos', icon: ShoppingBag },
  { id: 'productos', label: 'Productos', icon: Package },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'configuracion', label: 'Configuracion', icon: Settings },
];

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  activo: { label: 'Activo', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  pausado: { label: 'Pausado', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  agotado: { label: 'Agotado', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  reservado: { label: 'Reservado', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  entregado: { label: 'Entregado', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  importando: { label: 'Importando', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
};

export default function BusinessPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productos, setProductos] = useState<Product[]>([]);
  const [ setEmpresas] = useState<Empresa[]>([]);
  const [catalogos, setCatalogos] = useState<Catalogo[]>([]);
  const [reservaciones, setReservaciones] = useState<ReservacionConDetalles[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCatalogo, setSelectedCatalogo] = useState<Catalogo | null>(null);
  const [catalogoProductos, setCatalogoProductos] = useState<Product[]>([]);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ nombre: '', descripcion: '', precio: '', cantidad_minima: '', cantidad_maxima: '', categoria: '', imagen_url: '', catalogo_id: '' });
  const [newProductLoading, setNewProductLoading] = useState(false);
  const [deliverCode, setDeliverCode] = useState('');
  const [delivering, setDelivering] = useState<number | null>(null);
  const [deliveringLoading, setDeliveringLoading] = useState<number | null>(null);
  const [showNewCatalogoModal, setShowNewCatalogoModal] = useState(false);
  const [newCatalogo, setNewCatalogo] = useState({ titulo: '', descripcion: '', fecha_finalizacion: '' });
  const [newCatalogoLoading, setNewCatalogoLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ nombre: '', descripcion: '', precio: '', cantidad_minima: '', cantidad_maxima: '', categoria: '', imagen_url: '', catalogo_id: '' });
  const [editLoading, setEditLoading] = useState(false);

  const empresaId = user?.empresas?.[0]?.id;

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [p, e, c, r] = await Promise.all([
        productosService.getAll(undefined, empresaId).catch(() => [] as Product[]),
        empresasService.getAll().catch(() => [] as Empresa[]),
        catalogosService.getAll(empresaId).catch(() => [] as Catalogo[]),
        reservacionesService.getAll(undefined, empresaId).catch(() => [] as ReservacionConDetalles[]),
      ]);
      setProductos(p);
      setEmpresas(e);
      setCatalogos(c);
      setReservaciones(r);
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'empresa') {
      navigate('/login');
      return;
    }
    loadData();
  }, [isAuthenticated, user?.role, navigate, loadData]);

  const catalogoNombre = useMemo(() => {
    const map: Record<number, string> = {};
    catalogos.forEach((c) => { map[c.id] = c.titulo; });
    return map;
  }, [catalogos]);

  const totalRevenue = useMemo(() => {
    return reservaciones
      .filter((r) => r.estado === 'entregado')
      .reduce((sum, r) => {
        const detalles = r.detalleReservaciones || [];
        return sum + detalles.reduce((sub, d) => sub + d.cantidad_pedida * d.precio_unitario, 0);
      }, 0);
  }, [reservaciones]);

  const loadCatalogoProductos = async (cat: Catalogo) => {
    setSelectedCatalogo(cat);
    const prods = await productosService.getAll(cat.id).catch(() => []);
    setCatalogoProductos(prods);
    setActiveTab('catalogos');
  };

  const handleCreateProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio || !newProduct.catalogo_id) return;
    setNewProductLoading(true);
    try {
      await productosService.create({
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        precio: Number(newProduct.precio),
        cantidad_minima: Number(newProduct.cantidad_minima) || 1,
        cantidad_maxima: Number(newProduct.cantidad_maxima) || 10,
        categoria: (newProduct.categoria as Categoria) || null,
        imagen_url:
          newProduct.imagen_url ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        catalogo_id: Number(newProduct.catalogo_id),
        cant_pedida: 0,
      });
      const updated = await productosService.getAll(undefined, empresaId);
      setProductos(updated);
      if (selectedCatalogo && Number(newProduct.catalogo_id) === selectedCatalogo.id) {
        setCatalogoProductos(updated.filter((p) => p.catalogo_id === selectedCatalogo.id));
      }
      setShowNewProductModal(false);
      setNewProduct({ nombre: '', descripcion: '', precio: '', cantidad_minima: '', cantidad_maxima: '', categoria: '', imagen_url: '', catalogo_id: '' });
    } catch (e) {
      console.error('Error creating product:', e);
    } finally {
      setNewProductLoading(false);
    }
  };

  const handleCreateCatalogo = async () => {
    if (!newCatalogo.titulo || !empresaId) return;
    setNewCatalogoLoading(true);
    try {
      await catalogosService.create({
        titulo: newCatalogo.titulo,
        descripcion: newCatalogo.descripcion,
        empresa_id: empresaId,
        fecha_finalizacion: newCatalogo.fecha_finalizacion || new Date().toISOString().split('T')[0],
        estado: 'activo',
      });
      const updated = await catalogosService.getAll(empresaId);
      setCatalogos(updated);
      setShowNewCatalogoModal(false);
      setNewCatalogo({ titulo: '', descripcion: '', fecha_finalizacion: '' });
    } catch (e) {
      console.error('Error creating catalog:', e);
    } finally {
      setNewCatalogoLoading(false);
    }
  };

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setEditForm({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: String(product.precio),
      cantidad_minima: String(product.cantidad_minima),
      cantidad_maxima: String(product.cantidad_maxima),
      categoria: (newProduct.categoria as Categoria) || "",
      imagen_url: product.imagen_url,
      catalogo_id: String(product.catalogo_id),
    });
  };

  const handleEditSave = async () => {
    if (!editProduct || !editForm.nombre || !editForm.precio) return;
    setEditLoading(true);
    try {
      await productosService.update(editProduct.id, {
        nombre: editForm.nombre,
        descripcion: editForm.descripcion,
        precio: Number(editForm.precio),
        cantidad_minima: Number(editForm.cantidad_minima) || 1,
        cantidad_maxima: Number(editForm.cantidad_maxima) || 10,
        categoria: (editForm.categoria as Categoria) || null,
        imagen_url: editForm.imagen_url,
        catalogo_id: Number(editForm.catalogo_id),
      });
      const updated = await productosService.getAll(undefined, empresaId);
      setProductos(updated);
      if (selectedCatalogo && Number(editForm.catalogo_id) === selectedCatalogo.id) {
        setCatalogoProductos(updated.filter((p) => p.catalogo_id === selectedCatalogo.id));
      }
      setEditProduct(null);
    } catch (e) {
      console.error('Error updating product:', e);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeliver = async (resId: number, expectedCode: string) => {
    if (!deliverCode.trim() || deliveringLoading) return;
    if (deliverCode.trim() !== expectedCode) {
      toast('Codigo incorrecto');
      return;
    }
    setDeliveringLoading(resId);
    try {
      await api.put('/api/reservaciones/' + resId, { estado: 'entregado' });
      const updated = await reservacionesService.getAll();
      setReservaciones(updated);
      setDeliverCode('');
      toast('Entrega confirmada', 'success');
    } catch (e) {
      console.error('Error delivering reservation:', e);
    } finally {
      setDeliveringLoading(null);
    }
  };

  const resetNewProduct = () => {
    setShowNewProductModal(false);
    setNewProduct({ nombre: '', descripcion: '', precio: '', cantidad_minima: '', cantidad_maxima: '', categoria: '', imagen_url: '', catalogo_id: '' });
  };

  const resetNewCatalogo = () => {
    setShowNewCatalogoModal(false);
    setNewCatalogo({ titulo: '', descripcion: '', fecha_finalizacion: '' });
  };

  if (!isAuthenticated || user?.role !== 'empresa') return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#0F172A' }}>
        <div className="w-10 h-10 border-2 border-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="!grid !grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 !gap-4 !mb-8">
              {[
                { icon: DollarSign, label: 'Ganancias Entregadas', value: 'Bs ' + totalRevenue.toFixed(2), change: '-', color: '#22C55E' },
                { icon: Package, label: 'Productos', value: String(productos.length), change: '-', color: '#3B82F6' },
                { icon: Users, label: 'Reservaciones', value: String(reservaciones.length), change: '-', color: '#8B5CF6' },
                { icon: TrendingUp, label: 'Catalogos', value: String(catalogos.length), change: '-', color: '#F59E0B' },
              ].map((stat, i) => (
                <div key={i} className="!rounded-2xl !p-5 !space-y-3" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div className="flex items-center justify-between">
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.change}</span>
                  </div>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-slate">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="!grid !grid-cols-1 lg:grid-cols-2 !gap-6 !mb-8">
              <div className="!rounded-2xl !p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h3 className="text-lg font-bold text-white !mb-4">Acciones Rapidas</h3>
                <div className="!grid !grid-cols-2 !gap-4">
                  {[
                    { icon: Plus, label: 'Agregar Catalogo', desc: 'Nuevo catalogo', color: '#F59E0B', action: () => setShowNewCatalogoModal(true) },
                    { icon: Package, label: 'Nuevo Producto', desc: 'Al catalogo', color: '#3B82F6', action: () => setShowNewProductModal(true) },
                    { icon: Users, label: 'Ver Clientes', desc: 'Lista de compradores', color: '#8B5CF6', action: () => setActiveTab('clientes') },
                  ].map((action, i) => (
                    <button key={i} onClick={action.action}
                      className="flex flex-col items-center justify-center gap-2 !p-5 !rounded-xl text-center transition-all duration-300 hover:scale-[1.02] hover:!border-amber/30"
                      style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: action.color + '15' }}>
                        <action.icon className="w-6 h-6" style={{ color: action.color }} />
                      </div>
                      <span className="text-sm font-semibold text-white">{action.label}</span>
                      <span className="text-xs text-slate">{action.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* <div className="rounded-2xl p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h3 className="text-lg font-bold text-white mb-4">Catalogos</h3>
                <div className="!space-y-3">
                  {catalogos.length === 0 ? (
                    <p className="text-slate text-sm">No hay catalogos.</p>
                  ) : (
                    catalogos.map((cat) => (
                      <div key={cat.id}
                        onClick={() => loadCatalogoProductos(cat)}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5"
                        style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{cat.titulo}</p>
                          <p className="text-xs text-slate">{cat.estado}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate" />
                      </div>
                    ))
                  )}
                </div>
              </div> */}
            </div>
          </>
        );

      case 'catalogos':
        return (
          <div className="!grid !grid-cols-1 lg:grid-cols-3 !gap-6">
            <div className="lg:col-span-1 rounded-2xl !p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="flex items-center justify-between !mb-4">
                <h3 className="text-lg font-bold text-white">Catalogos</h3>
                <button onClick={() => setShowNewCatalogoModal(true)} className="text-amber hover:text-amber-light transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="!space-y-2">
                {catalogos.map((cat) => (
                  <button key={cat.id} onClick={() => loadCatalogoProductos(cat)}
                    className="w-full text-left !p-3 rounded-xl transition-all"
                    style={{
                      background: selectedCatalogo?.id === cat.id ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: selectedCatalogo?.id === cat.id ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
                    }}>
                    <p className="text-sm font-semibold text-white">{cat.titulo}</p>
                    <p className="text-xs text-slate">{cat.descripcion.slice(0, 50)}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-2xl !p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="flex items-center justify-between !mb-4">
                <h3 className="text-lg font-bold text-white">
                  {selectedCatalogo ? selectedCatalogo.titulo : 'Selecciona un catalogo'}
                </h3>
                <div className="flex items-center gap-3">
                  {selectedCatalogo && (
                    <>
                      <button onClick={() => {
                        if (selectedCatalogo) setNewProduct(function(p) { return { ...p, catalogo_id: String(selectedCatalogo.id) }; });
                        setShowNewProductModal(true);
                      }} className="flex items-center gap-1 text-sm bg-amber hover:bg-amber-dark text-oxford font-semibold !px-4 !py-2 rounded-xl transition-all">
                        <Plus className="w-4 h-4" />
                        Agregar Producto
                      </button>
                      <button onClick={function() { setSelectedCatalogo(null); setCatalogoProductos([]); loadData(); }} className="text-sm text-slate hover:text-amber transition-colors">
                        Recargar
                      </button>
                    </>
                  )}
                </div>
              </div>
              {!selectedCatalogo ? (
                <p className="text-slate text-sm !py-8 text-center">Selecciona un catalogo a la izquierda para ver sus productos.</p>
              ) : catalogoProductos.length === 0 ? (
                <p className="text-slate text-sm !py-8 text-center">Este catalogo no tiene productos aun.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate text-left">
                        <th className="!pb-4 font-medium">Producto</th>
                        <th className="!pb-4 font-medium">Precio</th>
                        <th className="!pb-4 font-medium">Pedidos</th>
                        <th className="!pb-4 font-medium">Estado</th>
                        <th className="!pb-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalogoProductos.map((p) => (
                        <tr key={p.id} className="!border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                          <td className="!py-4 text-white font-medium">{p.nombre}</td>
                          <td className="!py-4 text-amber font-bold">{'$' + Number(p.precio).toFixed(2)}</td>
                          <td className="!py-4 text-slate">{p.cant_pedida}/{p.cantidad_minima}</td>
                          <td className="!py-4">
                            <span className="text-xm font-semibold !px-3 !py-1 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>
                              {p.cant_pedida >= p.cantidad_maxima ? 'Completado' : 'Activo'}
                            </span>
                          </td>
                          <td className="py-4">
                            <button onClick={() => openEditModal(p)} className="p-2 rounded-lg text-slate hover:text-blue-400 hover:bg-white/5 transition-all"><Edit className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      case 'productos':
        return (
          <div className="!space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Todos los Productos</h3>
              <button onClick={() => setShowNewProductModal(true)} className="flex items-center gap-2 !bg-amber hover:bg-amber-dark text-oxford font-semibold !px-5 !py-2.5 rounded-xl transition-all text-sm">
                <Plus className="w-4 h-4" />
                Nuevo Producto
              </button>
            </div>

            <div className="rounded-2xl !p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate text-left">
                      <th className="!pb-4 font-medium">Producto</th>
                      <th className="!pb-4 font-medium">Precio</th>
                      <th className="!pb-4 font-medium hidden md:table-cell">Catalogo</th>
                      <th className="!pb-4 font-medium hidden md:table-cell">Pedidos</th>
                      <th className="!pb-4 font-medium">Estado</th>
                      <th className="!pb-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((product) => (
                      <tr key={product.id} className="!border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                        <td className="!py-4 text-white font-medium">{product.nombre}</td>
                        <td className="!py-4 text-amber font-bold">{'$' + Number(product.precio).toFixed(2)}</td>
                        <td className="!py-4 text-slate hidden md:table-cell">{catalogoNombre[product.catalogo_id] || 'ID: ' + product.catalogo_id}</td>
                        <td className="!py-4 text-slate hidden md:table-cell">{product.cant_pedida}/{product.cantidad_minima}</td>
                        <td className="!py-4">
                          <span className="text-xs font-semibold !px-3 !py-1 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}>
                            {product.cant_pedida >= product.cantidad_maxima ? 'Completado' : 'Activo'}
                          </span>
                        </td>
                        <td className="!py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditModal(product)} className="p-2 rounded-lg text-slate hover:text-blue-400 hover:bg-white/5 transition-all"><Edit className="w-4 h-4" /></button>
                            <button className="p-2 rounded-lg text-slate hover:text-red-400 hover:bg-white/5 transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'clientes':
        return (
          <div className="rounded-2xl !p-6" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <h3 className="text-lg font-bold text-white !mb-6">Reservaciones de Clientes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate text-left">
                    <th className="!pb-4 font-medium">Cliente</th>
                    <th className="!pb-4 font-medium">Email</th>
                    <th className="!pb-4 font-medium">Codigo</th>
                    <th className="!pb-4 font-medium">Fecha</th>
                    <th className="!pb-4 font-medium">Estado</th>
                    <th className="!pb-4 font-medium">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {reservaciones.length === 0 ? (
                    <tr><td colSpan={6} className="!py-8 text-center text-slate">No hay reservaciones.</td></tr>
                  ) : (
                    reservaciones.map((res) => (
                      <tr key={res.id} className="!border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                        <td className="!py-4 text-white font-medium">{res.user?.nombres || '-'} {res.user?.apellidos || ''}</td>
                        <td className="!py-4 text-slate">{res.user?.email || '-'}</td>
                        <td className="!py-4 text-slate font-mono text-xs">****</td>
                        <td className="!py-4 text-slate">{new Date(res.fecha_reservacion).toLocaleDateString()}</td>
                        <td className="!py-4">
                          <span className="text-xs font-semibold !px-3 !py-2 rounded-full"
                            style={{ background: statusStyles[res.estado]?.bg, color: statusStyles[res.estado]?.color }}>
                            {statusStyles[res.estado]?.label || res.estado}
                          </span>
                        </td>
                        <td className="!py-4">
                          {res.estado === 'reservado' || res.estado === 'importando' ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <input type="text" placeholder="Ingrese codigo"
                                  value={delivering === res.id ? deliverCode : ''}
                                  onChange={function(e) { setDeliverCode(e.target.value); setDelivering(res.id); }}
                                  className="w-28 !px-2 !py-1.5 rounded-lg text-xs text-white outline-none"
                                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                                <button onClick={function() { handleDeliver(res.id, res.codigo_unico); }}
                                  disabled={deliveringLoading === res.id}
                                  className="text-xs font-semibold !px-3 !py-1.5 rounded-lg transition-all disabled:opacity-50"
                                  style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' }}>
                                  {deliveringLoading === res.id ? '...' : 'Entregar'}
                                </button>
                              </div>
                              {deliveringLoading === res.id ? (
                                <span className="text-xs text-amber">Verificando...</span>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-xs text-slate">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="rounded-2xl !p-12 flex flex-col items-center justify-center text-center !space-y-4"
            style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <Package className="w-16 h-16 text-white/10" />
            <h3 className="text-xl font-bold text-white">Proximamente</h3>
            <p className="text-slate/50 text-sm">Esta seccion estara disponible pronto.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <div className="flex">
        <aside className="w-64 min-h-screen hidden lg:block !p-4 flex flex-col"
          style={{ background: 'rgba(255, 255, 255, 0.03)', borderRight: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <Link to="/" className="flex items-center gap-2 !px-4 !py-6 !mb-4">
            <span className="text-2xl">🐧</span>
            <span className="text-lg font-bold text-white">Pingu <span className="text-amber">Empresas</span></span>
          </Link>
          <div className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center gap-3 !px-4 !py-3 !rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: activeTab === item.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: activeTab === item.id ? '#FCD34D' : 'rgba(203, 213, 225, 0.7)',
                }}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="!pt-8 !space-y-2">
            <div className="!px-4 !py-3 text-xs text-slate !border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {user?.nombres} {user?.apellidos}
            </div>
            <button onClick={function() { logout(); navigate('/'); }}
              className="w-full flex items-center gap-3 !px-4 !py-3 !rounded-xl text-sm text-slate hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
              Cerrar Sesion
            </button>
            <Link to="/" className="flex items-center gap-3 !px-4 !py-3 !rounded-xl text-sm text-slate hover:text-white transition-colors">
              ← Volver al Sitio
            </Link>
          </div>
        </aside>

        <div className="flex-1 !p-6 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 !mb-10">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Panel de Empresa</h1>
              <p className="text-slate text-sm">Gestiona tus productos y grupos de importacion</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                <input type="text" placeholder="Buscar..."
                  className="!pl-10 !pr-4 !py-2.5 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 w-full sm:w-56"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              </div>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>

      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center !p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl !p-6 w-full !max-w-lg space-y-4 overflow-y-auto max-h-screen" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Editar Producto</h3>
              <button onClick={() => setEditProduct(null)} className="text-slate hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {editProduct.imagen_url && (
              <img src={editProduct.imagen_url} alt={editProduct.nombre} className="w-full h-40 object-cover rounded-xl" />
            )}
            <div className="!grid !grid-cols-1 sm:grid-cols-2 !gap-4 !pt-4">
              <input placeholder="Nombre" value={editForm.nombre} onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 sm:col-span-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Precio" type="number" value={editForm.precio} onChange={(e) => setEditForm({ ...editForm, precio: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <select value={editForm.categoria} onChange={(e) => setEditForm({ ...editForm, categoria: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 !bg-[#0F172A]"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <option value="" className="bg-oxford text-white">Sin categoria</option>
                <option value="Tecnologia" className="bg-oxford text-white">Tecnologia</option>
                <option value="Ropa" className="bg-oxford text-white">Ropa</option>
                <option value="Hogar" className="bg-oxford text-white">Hogar</option>
                <option value="Deportes" className="bg-oxford text-white">Deportes</option>
                <option value="Accesorios" className="bg-oxford text-white">Accesoriosss</option>
              </select>
              <textarea placeholder="Descripcion" value={editForm.descripcion} onChange={(e) => setEditForm({ ...editForm, descripcion: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 sm:col-span-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Cant. Minima" type="number" value={editForm.cantidad_minima} onChange={(e) => setEditForm({ ...editForm, cantidad_minima: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Cant. Maxima" type="number" value={editForm.cantidad_maxima} onChange={(e) => setEditForm({ ...editForm, cantidad_maxima: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <select value={editForm.catalogo_id} onChange={(e) => setEditForm({ ...editForm, catalogo_id: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 sm:col-span-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {catalogos.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-oxford text-white">{cat.titulo}</option>
                ))}
              </select>
              <input placeholder="URL de imagen" value={editForm.imagen_url} onChange={(e) => setEditForm({ ...editForm, imagen_url: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 sm:col-span-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            </div>
            <div className="flex !gap-3 !pt-4">
              <button onClick={handleEditSave} disabled={editLoading}
                className="!bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-3 rounded-xl transition-all disabled:opacity-50">
                {editLoading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button onClick={() => setEditProduct(null)}
                className="text-slate hover:text-white !px-6 !py-3 rounded-xl transition-all" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center !p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl !p-6 w-full max-w-lg !space-y-4 overflow-y-auto max-h-screen" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Nuevo Producto</h3>
              <button onClick={resetNewProduct} className="text-slate hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="!grid !grid-cols-1 sm:grid-cols-2 !gap-4">
              <input placeholder="Nombre *" value={newProduct.nombre} onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Precio *" type="number" value={newProduct.precio} onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <textarea placeholder="Descripcion" value={newProduct.descripcion} onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 sm:col-span-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Cant. Minima" type="number" value={newProduct.cantidad_minima} onChange={(e) => setNewProduct({ ...newProduct, cantidad_minima: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Cant. Maxima" type="number" value={newProduct.cantidad_maxima} onChange={(e) => setNewProduct({ ...newProduct, cantidad_maxima: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <select value={newProduct.categoria} onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <option value="" className="bg-oxford text-white">Sin categoria</option>
                <option value="Tecnologia" className="bg-oxford text-white">Tecnologia</option>
                <option value="Ropa" className="bg-oxford text-white">Ropa</option>
                <option value="Hogar" className="bg-oxford text-white">Hogar</option>
                <option value="Deportes" className="bg-oxford text-white">Deportes</option>
                <option value="Accesorios" className="bg-oxford text-white">Accesorios</option>
              </select>
              <select value={newProduct.catalogo_id} onChange={(e) => setNewProduct({ ...newProduct, catalogo_id: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <option value="" className="bg-oxford text-white">Seleccionar catalogo *</option>
                {catalogos.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-oxford text-white">{cat.titulo}</option>
                ))}
              </select>
              <input placeholder="URL de imagen (opcional)" value={newProduct.imagen_url} onChange={(e) => setNewProduct({ ...newProduct, imagen_url: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            </div>
            <div className="flex gap-3 !pt-2">
              <button onClick={handleCreateProduct} disabled={newProductLoading}
                className="bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-3 rounded-xl transition-all disabled:opacity-50">
                {newProductLoading ? 'Creando...' : 'Crear Producto'}
              </button>
              <button onClick={resetNewProduct}
                className="text-slate hover:text-white !px-6 !py-3 rounded-xl transition-all" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewCatalogoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl !p-6 w-full max-w-lg !space-y-4" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Nuevo Catalogo</h3>
              <button onClick={resetNewCatalogo} className="text-slate hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="!grid !grid-cols-1 sm:grid-cols-2 !gap-4">
              <input placeholder="Titulo *" value={newCatalogo.titulo} onChange={(e) => setNewCatalogo({ ...newCatalogo, titulo: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <input placeholder="Fecha de finalizacion" type="date" value={newCatalogo.fecha_finalizacion} onChange={(e) => setNewCatalogo({ ...newCatalogo, fecha_finalizacion: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <textarea placeholder="Descripcion" value={newCatalogo.descripcion} onChange={(e) => setNewCatalogo({ ...newCatalogo, descripcion: e.target.value })}
                className="!px-4 !py-3 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 sm:col-span-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
            </div>
            <div className="flex gap-3 !pt-2">
              <button onClick={handleCreateCatalogo} disabled={newCatalogoLoading}
                className="bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-3 rounded-xl transition-all disabled:opacity-50">
                {newCatalogoLoading ? 'Creando...' : 'Crear Catalogo'}
              </button>
              <button onClick={resetNewCatalogo}
                className="text-slate hover:text-white !px-6 !py-3 rounded-xl transition-all" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
