import { Controller, Post, Body } from '@nestjs/common';
import { PayPalService } from './paypal.service';

@Controller('api/paypal')
export class PayPalController {
  constructor(private readonly paypalService: PayPalService) {}

  @Post('create-order')
  async createOrder(@Body() data: { items: any[]; total: number; moneda: string }) {
    return this.paypalService.createOrder(data);
  }

  @Post('capture-order')
  async captureOrder(@Body() data: { orderId: string }) {
    return this.paypalService.captureOrder(data.orderId);
  }

  @Post('cancel-order')
  async cancelOrder(@Body() data: { orderId: string }) {
    return this.paypalService.cancelOrder(data.orderId);
  }
}
