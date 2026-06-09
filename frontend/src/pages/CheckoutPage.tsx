import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Shield, Truck, Building2, CheckCircle, Package, CreditCard } from 'lucide-react';
import { reservacionesService } from '../services/reservaciones';
import { catalogosService } from '../services/catalogos';
import { empresasService } from '../services/empresas';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/payment/PayPalButton';
import type { CartItem, Catalogo, Empresa, PaymentResult } from '../types';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const [catalogos, setCatalogos] = useState<Catalogo[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [resCodigo, setResCodigo] = useState('');

  const items: CartItem[] = (location.state as { items?: CartItem[] })?.items || [];

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (items.length === 0) { setLoading(false); return; }
    Promise.all([
      catalogosService.getAll().catch(() => [] as Catalogo[]),
      empresasService.getAll().catch(() => [] as Empresa[]),
    ]).then(([c, e]) => {
      setCatalogos(c);
      setEmpresas(e);
    }).finally(() => setLoading(false));
  }, [isAuthenticated, navigate, items.length]);

  const catalogoEmpresaMap = useMemo(() => {
    const map: Record<number, number> = {};
    catalogos.forEach((c) => { map[c.id] = c.empresa_id; });
    return map;
  }, [catalogos]);

  const empresaNombreMap = useMemo(() => {
    const map: Record<number, string> = {};
    empresas.forEach((e) => { map[e.id] = e.nombre; });
    return map;
  }, [empresas]);

  const groupedByEmpresa = useMemo(() => {
    const groups: { empresaId: number; empresaNombre: string; items: CartItem[] }[] = [];
    const map = new Map<number, CartItem[]>();
    items.forEach((item) => {
      const empId = catalogoEmpresaMap[item.catalogo_id] || 0;
      if (!map.has(empId)) map.set(empId, []);
      map.get(empId)!.push(item);
    });
    map.forEach((groupItems, empId) => {
      groups.push({
        empresaId: empId,
        empresaNombre: empresaNombreMap[empId] || 'Empresa #' + empId,
        items: groupItems,
      });
    });
    return groups;
  }, [items, catalogoEmpresaMap, empresaNombreMap]);

  const subtotal = items.reduce((sum, item) => sum + Number(item.precio) * item.quantity, 0);
  const total = subtotal;

  const createReservation = useCallback(async () => {
    if (!user) return;
    const codigo = 'PING-' + Date.now();
    const res = await reservacionesService.create({
      user_id: user.id,
      codigo_unico: codigo,
      estado: 'reservado',
    });
    for (const item of items) {
      await api.post('/api/detalle-reservacion', {
        reservacion_id: res.id,
        product_id: item.id,
        cantidad_pedida: item.quantity,
        precio_unitario: item.precio,
      });
    }
    setResCodigo(codigo);
    clearCart();
    setDone(true);
    setStep(3);
  }, [user, items, clearCart]);

  const handlePay = async () => {
    if (!user || creating) return;
    setCreating(true);
    try {
      await createReservation();
    } catch (e) {
      console.error('Error creating reservation:', e);
    } finally {
      setCreating(false);
    }
  };

  const handlePayPalSuccess = async (_result: PaymentResult) => {
    if (!user || creating) return;
    setCreating(true);
    try {
      await createReservation();
    } catch (e) {
      console.error('Error creating reservation after PayPal:', e);
    } finally {
      setCreating(false);
    }
  };

  const handlePayPalError = (error: string) => {
    console.error('PayPal error:', error);
  };

  if (!isAuthenticated) return null;

  if (items.length === 0 && !loading) {
    return (
      <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
        <div className="max-w-6xl mx-auto !px-6 !py-24 text-center !space-y-4">
          <ShoppingBag className="w-20 h-20 text-white/10 mx-auto" />
          <h2 className="text-2xl font-extrabold text-white">Carrito vacio</h2>
          <p className="text-slate">Agrega productos desde la tienda para iniciar el checkout.</p>
          <button onClick={() => navigate('/tienda')}
            className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-4 rounded-xl transition-all duration-300">
            Ir a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-start items-center w-full"
      style={{ backgroundColor: "#0F172A", minHeight: "100vh" }}
    >
      <div className="w-full !max-w-7xl !px-6 !py-12 !pt-24">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate hover:text-amber transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="text-center !mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            <ShoppingBag className="w-8 h-8 inline-block text-amber mr-3" />
            Checkout
          </h1>
          <p className="text-slate mt-2">Revisa tu pedido antes de pagar</p>
        </div>

        <div className="flex items-center justify-center gap-4 !mb-12">
          {[
            { num: 1, label: "Resumen" },
            { num: 2, label: "Pago" },
            { num: 3, label: "Confirmacion" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background:
                    step >= s.num ? "#F59E0B" : "rgba(255, 255, 255, 0.06)",
                  color: step >= s.num ? "#0F172A" : "rgba(203, 213, 225, 0.5)",
                }}
              >
                {step > s.num ? "\u2713" : s.num}
              </div>
              <span
                className="text-sm font-medium hidden sm:inline"
                style={{
                  color: step >= s.num ? "#FFF" : "rgba(203, 213, 225, 0.5)",
                }}
              >
                {s.label}
              </span>
              {s.num < 3 && (
                <div
                  className="w-8 h-px !mx-1"
                  style={{
                    background:
                      step > s.num ? "#F59E0B" : "rgba(255,255,255,0.1)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 !space-y-6">
            {step === 1 && (
              <>
                {groupedByEmpresa.map((group) => (
                  <div
                    key={group.empresaId}
                    className="rounded-2xl p-6 space-y-4"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 border-b !pb-3"
                      style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                    >
                      <Building2 className="w-5 h-5 text-amber" />
                      <h3 className="text-base font-bold text-white">
                        {group.empresaNombre}
                      </h3>
                    </div>
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 !p-3 rounded-xl"
                        style={{ background: "rgba(255, 255, 255, 0.03)" }}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {item.nombre}
                          </p>
                          <p className="text-xs text-slate">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="text-amber font-bold">
                          ${(Number(item.precio) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}

                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-base"
                  style={{ boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)" }}
                >
                  Continuar al Pago
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </>
            )}

            {step === 2 && (
              <div
                className="rounded-2xl !p-6 space-y-6"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber" />
                  Resumen del Pedido
                </h2>

                {groupedByEmpresa.map((group) => (
                  <div key={group.empresaId} className="!space-y-2 !pt-4">
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider !text-amber">
                      {group.empresaNombre}
                    </p>
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-slate truncate !mr-2">
                          {item.nombre}{" "}
                          <span className="text-white/50">
                            x{item.quantity}
                          </span>
                        </span>
                        <span className="text-white font-medium">
                          ${(Number(item.precio) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                <div
                  className="!border-t !pt-4 !space-y-2"
                  style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Envio</span>
                    <span className="text-green-400 font-medium">Gratis</span>
                  </div>
                  <div
                    className="flex justify-between text-base !pt-2 !border-t"
                    style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <span className="text-white font-bold">Total</span>
                    <span className="text-amber font-extrabold text-xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="!space-y-4">
                  <div className="!space-y-3">
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber" />
                      Paga con PayPal
                    </p>
                    {creating ? (
                      <div
                        className="!p-4 rounded-xl text-sm font-medium text-amber text-center"
                        style={{
                          background: "rgba(245, 158, 11, 0.1)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                        }}
                      >
                        Procesando tu pago y creando reservacion...
                      </div>
                    ) : (
                      <PayPalButton
                        items={items}
                        total={total}
                        onSuccess={handlePayPalSuccess}
                        onError={handlePayPalError}
                      />
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3" style={{ backgroundColor: "#0F172A", color: "rgba(203, 213, 225, 0.5)" }}>
                        O paga directamente
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={creating || done}
                    className="w-full flex items-center justify-center gap-2 !bg-amber hover:bg-amber-dark text-oxford font-bold !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-base disabled:opacity-50"
                    style={{ boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)" }}
                  >
                    {creating ? "Procesando..." : "Pagar $" + total.toFixed(2)}
                  </button>
                </div>

                <div className="flex items-center gap-2 !pt-2 text-xs text-slate">
                  <Shield className="w-4 h-4 text-green-400" />
                  Pago seguro con encriptacion SSL
                </div>
                <div className="flex items-center gap-2 text-xs text-slate">
                  <Truck className="w-4 h-4 text-amber" />
                  Envio gratis en todos los pedidos
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-slate hover:text-amber transition-colors py-2"
                >
                  {"\u2190"} Volver al resumen
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center !space-y-6 !py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center !mx-auto"
                  style={{ background: "rgba(34, 197, 94, 0.1)" }}
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  {"¡Compra Exitosa!"}
                </h2>
                <p className="text-slate !max-w-md !mx-auto">
                  Tu reservacion ha sido creada exitosamente. Recibiras un
                  correo con los detalles.
                </p>
                {resCodigo && (
                  <p className="text-sm text-slate">
                    Codigo:{" "}
                    <span className="text-amber font-mono font-bold">
                      {resCodigo}
                    </span>
                  </p>
                )}

                <div className="!space-y-4 !max-w-md !mx-auto text-left">
                  {groupedByEmpresa.map((group) => (
                    <div
                      key={group.empresaId}
                      className="rounded-xl !p-4"
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <div className="flex items-center gap-2 !mb-2">
                        <Building2 className="w-4 h-4 text-amber" />
                        <span className="text-sm font-semibold text-white">
                          {group.empresaNombre}
                        </span>
                      </div>
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-xs text-slate !py-1"
                        >
                          <span>
                            {item.nombre} x{item.quantity}
                          </span>
                          <span className="text-white">
                            ${(Number(item.precio) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center !pt-4">
                  <Link
                    to="/client"
                    className="inline-flex items-center justify-center gap-2 !bg-amber hover:bg-amber-dark text-oxford font-bold !px-8 !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Package className="w-5 h-5" />
                    Ver Mis Reservaciones
                  </Link>
                  <button
                    onClick={() => navigate("/tienda")}
                    className="inline-flex items-center justify-center gap-2 font-semibold !px-8 !py-4 rounded-xl transition-all text-white"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* <div
            className="rounded-2xl !p-6 h-fit space-y-4"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <h3 className="text-lg font-bold text-white">Resumen del Pedido</h3>

            {groupedByEmpresa.map((group) => (
              <div key={group.empresaId} className="!space-y-2">
                <p className="text-xs font-semibold text-amber">
                  {group.empresaNombre}
                </p>
                {group.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate truncate mr-2">
                      {item.nombre}{" "}
                      <span className="text-white/50">x{item.quantity}</span>
                    </span>
                    <span className="text-white font-medium">
                      ${(Number(item.precio) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            <div
              className="!border-t !pt-4 !space-y-2"
              style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <div className="flex justify-between text-sm">
                <span className="text-slate">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate">Envio</span>
                <span className="text-green-400 font-medium">Gratis</span>
              </div>
            </div>

            <div
              className="!border-t !pt-4 flex justify-between items-center"
              style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-amber font-extrabold text-2xl">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 !pt-2 text-xs text-slate">
              <Shield className="w-4 h-4 text-green-400" />
              Pago seguro con encriptacion SSL
            </div>
            <div className="flex items-center gap-2 text-xs text-slate">
              <Truck className="w-4 h-4 text-amber" />
              Envio gratis en todos los pedidos
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
