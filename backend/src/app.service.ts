import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule'; // 1. Importaciones necesarias
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Ping de mantenimiento enviado...');

    try {
      const url = 'https://pingu-importaciones.onrender.com/api/health';
      await axios.get(url);
    } catch (error) {
      this.logger.error('Error en el ping:', error.message);
    }
  }
}
