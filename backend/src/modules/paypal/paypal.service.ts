import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PayPalService {
  private readonly logger = new Logger(PayPalService.name);
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>('PAYPAL_MODE') === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';
  }

  private async getAccessToken(): Promise<string> {
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new HttpException(
        'PayPal no configurado. Revisa PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET en .env',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
      const { data } = await axios.post<{ access_token: string }>(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return data.access_token;
    } catch (error: any) {
      this.logger.error('Error getting PayPal access token', error?.response?.data || error.message);
      throw new HttpException('Error al autenticar con PayPal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOrder(data: { items: any[]; total: number; moneda: string }) {
    const accessToken = await this.getAccessToken();
    const currency = data.moneda || 'USD';

    const purchaseItems = data.items.map((item) => ({
      name: item.nombre || 'Producto',
      unit_amount: {
        currency_code: currency,
        value: Number(item.precio_unitario || 0).toFixed(2),
      },
      quantity: String(item.cantidad || 1),
    }));

    const payload = {
      intent: 'CAPTURE' as const,
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: Number(data.total).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: currency,
                value: Number(data.total).toFixed(2),
              },
            },
          },
          items: purchaseItems,
        },
      ],
    };

    try {
      const { data: response } = await axios.post(
        `${this.baseUrl}/v2/checkout/orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response;
    } catch (error: any) {
      this.logger.error('Error creating PayPal order', error?.response?.data || error.message);
      throw new HttpException('Error al crear la orden en PayPal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async captureOrder(orderId: string) {
    const accessToken = await this.getAccessToken();

    try {
      const { data: response } = await axios.post(
        `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const capture = response.purchase_units?.[0]?.payments?.captures?.[0];

      return {
        status: response.status === 'COMPLETED' ? ('completed' as const) : ('failed' as const),
        transactionId: capture?.id || orderId,
        payerEmail: response.payer?.email_address || '',
      };
    } catch (error: any) {
      this.logger.error('Error capturing PayPal order', error?.response?.data || error.message);
      throw new HttpException('Error al capturar el pago en PayPal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async cancelOrder(orderId: string) {
    this.logger.log(`PayPal order cancelled: ${orderId}`);
    return { status: 'cancelled' as const, orderId };
  }
}
