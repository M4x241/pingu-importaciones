import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '../../entities/producto.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/productos')
export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  @Public()
  @Get()
  findAll(
    @Query('catalogo_id') catalogo_id?: string,
    @Query('empresa_id') empresa_id?: string,
  ) {
    return this.service.findAll(
      catalogo_id ? +catalogo_id : undefined,
      empresa_id ? +empresa_id : undefined,
    );
  }

  @Public()
  @Get('destacados')
  findFeatured() {
    return this.service.findFeatured();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Roles('admin', 'empresa')
  @Post()
  create(@Body() data: Partial<Producto>, @CurrentUser() user: any) {
    return this.service.create(data, user?.empresa_ids);
  }

  @Roles('admin', 'empresa')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Producto>, @CurrentUser() user: any) {
    return this.service.update(+id, data, user?.empresa_ids);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(+id, user?.empresa_ids);
  }
}
