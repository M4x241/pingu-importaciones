import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleReservacion } from '../../entities/detalle-reservacion.entity';
import { DetalleReservacionController } from './detalle-reservacion.controller';
import { DetalleReservacionService } from './detalle-reservacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleReservacion])],
  controllers: [DetalleReservacionController],
  providers: [DetalleReservacionService],
  exports: [DetalleReservacionService],
})
export class DetalleReservacionModule {}
