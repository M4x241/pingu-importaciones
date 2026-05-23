import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '../../entities/producto.entity';

@Controller('api/productos')
export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  @Get()
  findAll(@Query('catalogo_id') catalogo_id?: string) {
    return this.service.findAll(catalogo_id ? +catalogo_id : undefined);
  }

  @Get('destacados')
  findFeatured() {
    return this.service.findFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Producto>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Producto>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
