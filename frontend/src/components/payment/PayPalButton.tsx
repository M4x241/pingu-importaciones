import { useState } from 'react';
import { paypalService } from '../../services/paypal';
import type { CartItem, PaymentResult } from '../../types';

interface PayPalButtonProps {
  items: CartItem[];
  total: number;
  onSuccess: (result: PaymentResult) => void;
  onError: (error: string) => void;
}

export default function PayPalButton({ items, total, onSuccess, onError }: PayPalButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!paypalService.isConfigured()) {
      onError('PayPal no está configurado. Agrega VITE_PAYPAL_CLIENT_ID en .env');
      return;
    }

    setLoading(true);
    try {
      const order = await paypalService.createOrder({
        items: items.map((item) => ({
          product_id: item.id,
          nombre: item.nombre,
          cantidad: item.quantity,
          precio_unitario: item.precio,
        })),
        total,
        moneda: 'USD',
      });

      // TODO: Integrar SDK de PayPal (https://www.paypal.com/sdk/js)
      // Una vez cargado el SDK, usar:
      //   paypal.Buttons({ createOrder, onApprove, onError }).render('#paypal-button-container');
      //
      // Ejemplo de integración completa:
      //   const sdk = await loadPayPalSDK(clientId);
      //   sdk.Buttons({
      //     createOrder: () => order.id,
      //     onApprove: async (data) => {
      //       const result = await paypalService.captureOrder(data.orderID);
      //       onSuccess(result);
      //     },
      //     onError: (err) => onError(err.message),
      //   }).render('#paypal-button-container');

      console.log('PayPal order created:', order);
      onSuccess({ status: 'pending', transactionId: order.id });
    } catch (err: any) {
      onError(err.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div id="paypal-button-container" className="min-h-[40px]" />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, #0070BA, #003087)',
          color: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(0, 112, 186, 0.3)',
        }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Procesando...
          </span>
        ) : (
          <>
            <svg className="w-8 h-8" viewBox="0 0 36 24" fill="none">
              <rect width="36" height="24" rx="4" fill="white" />
              <path d="M13.5 8H10.2c-.3 0-.5.2-.6.5l-1.7 10.7c0 .2.1.3.3.3h2.2c.3 0 .5-.2.6-.5l.7-4.3c0-.3.3-.5.6-.5h1.4c2.8 0 4.5-1.4 4.9-4 .2-1.2 0-2.2-.5-2.9-.6-.7-1.6-1.1-3-1.3z" fill="#001C64" />
              <path d="M18 9.3c-.1-.7-.5-1.1-1.1-1.4-.1 0-.2-.1-.3-.1.4-.2.8-.3 1.3-.3h.7c.9 0 1.7.3 2.2.9.5.6.7 1.4.5 2.3-.3 1.8-1.7 2.8-3.4 2.8h-1.1c-.3 0-.5.2-.6.5l-.7 4.3c0 .2-.1.3-.3.3h-2.2c-.2 0-.3-.1-.3-.3l1.7-10.7c.1-.3.3-.5.6-.5h3.3c.9 0 1.7.2 2.3.6.4.3.7.7.9 1.2.1.3.2.6.2.9 0 .7-.2 1.3-.6 1.7-.3.3-.7.6-1.2.8z" fill="#0070E0" />
              <path d="M17.5 11.7c0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.8-.3h-1.5l-.6 3.8c0 .1 0 .2.1.2h1.2c.8 0 1.5-.3 1.9-.8.2-.3.3-.6.3-.9v-.2c0-.3-.1-.6-.3-.8v-.3z" fill="#003087" />
            </svg>
            Paga con PayPal
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate/50">
        Tus datos de pago están protegidos con encriptación SSL.
        {!paypalService.isConfigured() && (
          <span className="block text-amber mt-1">
            ⚠️ PayPal en modo demostración. Configura VITE_PAYPAL_CLIENT_ID en .env
          </span>
        )}
      </p>
    </div>
  );
}
