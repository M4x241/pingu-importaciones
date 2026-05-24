import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CreditCard, Shield, Truck, MapPin, ChevronDown } from 'lucide-react';
import PayPalButton from '../components/payment/PayPalButton';
import { reservacionesService } from '../services/reservaciones';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { PaymentResult, CartItem } from '../types';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [paymentError, setPaymentError] = useState('');
  const [creating, setCreating] = useState(false);

  const items: CartItem[] = (location.state as { items?: CartItem[] })?.items || [];
  const subtotal = items.reduce((sum, item) => sum + Number(item.precio) * item.quantity, 0);
  const envio = 0;
  const total = subtotal + envio;

  const handlePaymentSuccess = async (result: PaymentResult) => {
    setPaymentResult(result);
    if (user && items.length > 0) {
      setCreating(true);
      try {
        const codigo = `PING-${Date.now()}`;
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
      } catch (e) {
        console.error('Error creating reservation:', e);
      } finally {
        setCreating(false);
      }
    }
    setStep(3);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center space-y-4">
          <ShoppingBag className="w-20 h-20 text-white/10 mx-auto" />
          <h2 className="text-2xl font-extrabold text-white">Carrito vacío</h2>
          <p className="text-slate">Agrega productos desde la tienda para iniciar el checkout.</p>
          <button
            onClick={() => navigate('/tienda')}
            className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold px-8 py-4 rounded-xl transition-all duration-300"
          >
            Ir a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate hover:text-amber transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            <ShoppingBag className="w-8 h-8 inline-block text-amber mr-3" />
            Checkout
          </h1>
          <p className="text-slate mt-2">Completa tu pedido en unos pasos</p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: 'Resumen' },
            { num: 2, label: 'Pago' },
            { num: 3, label: 'Confirmación' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: step >= s.num ? '#F59E0B' : 'rgba(255, 255, 255, 0.06)',
                  color: step >= s.num ? '#0F172A' : 'rgba(203, 213, 225, 0.5)',
                }}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="text-sm font-medium hidden sm:inline" style={{ color: step >= s.num ? '#FFF' : 'rgba(203, 213, 225, 0.5)' }}>
                {s.label}
              </span>
              {s.num < 3 && <div className="w-8 h-px mx-1" style={{ background: step > s.num ? '#F59E0B' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <>
                <div
                  className="rounded-2xl p-6 space-y-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber" />
                      Dirección de Envío
                    </h2>
                    <button className="text-sm text-amber hover:text-amber-light transition-colors">Editar</button>
                  </div>
                  <div className="text-sm text-slate space-y-1">
                    <p className="text-white font-medium">{user?.nombres || 'Usuario'} {user?.apellidos || ''}</p>
                    <p>Calle Principal #123, Colonia Centro</p>
                    <p>Ciudad de México, CP 06600</p>
                    <p>Tel: +52 55 1234 5678</p>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6 space-y-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber" />
                    Productos ({items.length})
                  </h2>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                        🐧
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.nombre}</p>
                        <p className="text-xs text-slate">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="text-amber font-bold">${(Number(item.precio) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-6 space-y-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber" />
                    Método de Pago
                  </h2>
                  <div className="flex items-center gap-4">
                    {['PayPal', 'Visa', 'Mastercard', 'Transferencia'].map((method) => (
                      <div
                        key={method}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                        style={{
                          background: method === 'PayPal' ? 'rgba(0, 112, 186, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                          border: `1px solid ${method === 'PayPal' ? 'rgba(0, 112, 186, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                          color: method === 'PayPal' ? '#FFF' : 'rgba(203, 213, 225, 0.6)',
                        }}
                      >
                        {method === 'PayPal' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="3" fill="#0070BA" />
                            <path d="M9 8H6.4c-.2 0-.4.1-.4.3l-1.1 7.2c0 .1 0 .2.2.2h1.5c.2 0 .4-.1.4-.3l.4-2.9c0-.2.2-.3.4-.3h.9c1.9 0 3-1 3.3-2.7.1-.8 0-1.5-.4-2-.3-.4-.9-.7-1.7-.8.1 0 .1 0 0 0z" fill="white" />
                            <path d="M12.2 9.7c0-.2.1-.3.2-.3h2.2c.6 0 1.1.2 1.5.6.3.4.5.9.3 1.6-.2 1.2-1.1 1.9-2.3 1.9h-1.1c-.2 0-.4.1-.4.3l-.5 3.2c0 .1-.1.2-.2.2h-1.5c-.1 0-.2-.1-.2-.2l1.2-7.3c0 0 0 0 0 0z" fill="white" />
                            <path d="M17.8 9.1c-.1 0-.2 0-.3.1 0 0 .1-.1.3-.1z" fill="white" />
                          </svg>
                        ) : (
                          <CreditCard className="w-4 h-4" />
                        )}
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-base"
                  style={{ boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)' }}
                >
                  Continuar al Pago
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              </>
            )}

            {step === 2 && (
              <div
                className="rounded-2xl p-6 space-y-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber" />
                  Selecciona tu Método de Pago
                </h2>

                {paymentError && (
                  <div className="p-4 rounded-xl text-sm font-medium" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    {paymentError}
                  </div>
                )}

                {creating && (
                  <div className="p-4 rounded-xl text-sm font-medium text-amber" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    Procesando tu pedido...
                  </div>
                )}

                <PayPalButton
                  items={items}
                  total={total}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4" style={{ background: '#0F172A', color: 'rgba(203, 213, 225, 0.5)' }}>
                      o paga con tarjeta
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-light">Número de Tarjeta</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                      style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-light">Vencimiento</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                        style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-light">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-amber/50"
                        style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'rgba(203, 213, 225, 0.8)',
                    }}
                  >
                    Pagar ${total.toFixed(2)}
                  </button>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-slate hover:text-amber transition-colors py-2"
                >
                  ← Volver al resumen
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6 py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: 'rgba(34, 197, 94, 0.1)' }}
                >
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-white">¡Pedido Confirmado!</h2>
                <p className="text-slate max-w-md mx-auto">
                  Tu pedido ha sido procesado exitosamente. Recibirás un correo con los detalles de seguimiento.
                </p>
                {paymentResult?.transactionId && (
                  <p className="text-sm text-slate">
                    Transacción: <span className="text-amber font-mono">{paymentResult.transactionId}</span>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Ver Mis Pedidos
                  </button>
                  <button
                    onClick={() => navigate('/tienda')}
                    className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-white"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            )}
          </div>

          <div
            className="rounded-2xl p-6 h-fit space-y-4"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <h3 className="text-lg font-bold text-white">Resumen del Pedido</h3>

            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-slate truncate mr-2">
                    {item.nombre} <span className="text-white/50">x{item.quantity}</span>
                  </span>
                  <span className="text-white font-medium">${(Number(item.precio) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
              <div className="flex justify-between text-sm">
                <span className="text-slate">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate">Envío</span>
                <span className="text-green-400 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate">Impuestos</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-amber font-extrabold text-2xl">${total.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate">
              <Shield className="w-4 h-4 text-green-400" />
              Pago seguro con encriptación SSL
            </div>
            <div className="flex items-center gap-2 text-xs text-slate">
              <Truck className="w-4 h-4 text-amber" />
              Envío gratis en todos los pedidos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
