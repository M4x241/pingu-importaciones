import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { paypalService } from '../../services/paypal';
import type { CartItem, PaymentResult } from '../../types';

interface PayPalButtonProps {
  items: CartItem[];
  total: number;
  onSuccess: (result: PaymentResult) => void;
  onError: (error: string) => void;
}

export default function PayPalButton({ items, total, onSuccess, onError }: PayPalButtonProps) {
  const clientId = paypalService.getClientId();

  if (!clientId) {
    return (
      <div
        className="p-4 rounded-xl text-sm text-center"
        style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        }}
      >
        <p className="text-amber font-medium">PayPal no configurado</p>
        <p className="text-slate mt-1 text-xs">
          Agrega <code className="text-white">VITE_PAYPAL_CLIENT_ID</code> en el archivo .env del frontend
        </p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{ color: 'gold', shape: 'rect', label: 'paypal', height: 48 }}
        createOrder={async () => {
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
          return order.id;
        }}
        onApprove={async (data) => {
          const result = await paypalService.captureOrder(data.orderID);
          onSuccess(result);
        }}
        onError={(err) => {
          onError(err instanceof Error ? err.message : 'Error al procesar el pago con PayPal');
        }}
      />
    </PayPalScriptProvider>
  );
}
