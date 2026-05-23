import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PayPalService {
  private readonly logger = new Logger(PayPalService.name);

  async createOrder(data: { items: any[]; total: number; moneda: string }) {
    // TODO: Integrar API de PayPal
    // const accessToken = await this.getAccessToken();
    // const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ intent: 'CAPTURE', purchase_units: [{ ... }] }),
    // });
    this.logger.log('PayPal createOrder called', data);
    return {
      id: `PING-ORDER-${Date.now()}`,
      status: 'CREATED',
      links: [{ href: '#', rel: 'approve', method: 'GET' }],
    };
  }

  async captureOrder(orderId: string) {
    this.logger.log(`PayPal captureOrder: ${orderId}`);
    return {
      status: 'completed',
      transactionId: `TXN-${Date.now()}`,
      payerEmail: 'cliente@pingu.com',
    };
  }

  async cancelOrder(orderId: string) {
    this.logger.log(`PayPal cancelOrder: ${orderId}`);
    return { status: 'cancelled' };
  }
}
