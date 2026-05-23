import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from '../../entities/reservacion.entity';
import { ReservacionesController } from './reservaciones.controller';
import { ReservacionesService } from './reservaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacion])],
  controllers: [ReservacionesController],
  providers: [ReservacionesService],
  exports: [ReservacionesService],
})
export class ReservacionesModule {}
