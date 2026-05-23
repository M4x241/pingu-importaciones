import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DetalleReservacionService } from './detalle-reservacion.service';
import { DetalleReservacion } from '../../entities/detalle-reservacion.entity';

@Controller('api/detalle-reservacion')
export class DetalleReservacionController {
  constructor(private readonly service: DetalleReservacionService) {}

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

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<DetalleReservacion>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
