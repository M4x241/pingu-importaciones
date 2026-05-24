import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DetalleReservacionService } from './detalle-reservacion.service';
import { DetalleReservacion } from '../../entities/detalle-reservacion.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/detalle-reservacion')
export class DetalleReservacionController {
  constructor(private readonly service: DetalleReservacionService) {}

  @Roles('admin')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<DetalleReservacion>) {
    return this.service.create(data);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
