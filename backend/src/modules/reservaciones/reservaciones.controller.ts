import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { Reservacion } from '../../entities/reservacion.entity';

@Controller('api/reservaciones')
export class ReservacionesController {
  constructor(private readonly service: ReservacionesService) {}

  @Get()
  findAll(@Query('user_id') user_id?: string) {
    return this.service.findAll(user_id ? +user_id : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Reservacion>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Reservacion>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
