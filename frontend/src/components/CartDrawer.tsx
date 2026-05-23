import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + Number(item.precio) * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout', { state: { items: cart } });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className="fixed top-0 right-0 h-full w-full max-w-md z-50 transition-transform duration-500 ease-out"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          background: '#0F172A',
          borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 !py-5 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-amber" />
              <h2 className="text-lg font-bold text-white">Tu Carrito</h2>
              {itemCount > 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#F59E0B', color: '#0F172A' }}
                >
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingBag className="w-16 h-16 text-white/10" />
                <p className="text-slate/50 text-lg font-medium">Tu carrito está vacío</p>
                <p className="text-slate/30 text-sm">Agrega productos para comenzar</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-sm font-semibold text-white truncate">{item.nombre}</h3>
                    <p className="text-amber font-bold">${(Number(item.precio) * item.quantity).toFixed(2)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                      >
                        <Minus className="w-3 h-3 text-white" />
                      </button>
                      <span className="text-sm font-medium text-white w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
                        style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="px-6 !py-5 border-t space-y-4" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Subtotal</span>
                <span className="text-white font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50">Envío</span>
                <span className="text-green-400 font-medium">Gratis</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-amber font-extrabold text-2xl">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  color: '#0F172A',
                  boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                }}
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
