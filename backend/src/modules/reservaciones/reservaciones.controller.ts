import { Controller, Get, Post, Body, Param, Put, Delete, Query, Req } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { Reservacion } from '../../entities/reservacion.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/reservaciones')
export class ReservacionesController {
  constructor(private readonly service: ReservacionesService) {}

  @Get()
  findAll(@Query('user_id') user_id?: string, @Query('empresa_id') empresa_id?: string, @CurrentUser() user?: any) {
    if (user?.role === 'admin' || user?.role === 'empresa') {
      return this.service.findAll(user_id ? +user_id : undefined, empresa_id ? +empresa_id : undefined);
    }
    return this.service.findAll(user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req?: any) {
    if (req?.user?.role === 'admin' || req?.user?.role === 'empresa') {
      return this.service.findOne(+id);
    }
    return this.service.findOne(+id, req?.user?.id);
  }

  @Post()
  create(@Body() data: Partial<Reservacion>, @Req() req: any) {
    return this.service.create({ ...data, user_id: data.user_id || req.user.id });
  }

  @Roles('admin', 'empresa')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Reservacion>) {
    return this.service.update(+id, data);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
