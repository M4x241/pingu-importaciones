import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { Catalogo } from '../../entities/catalogo.entity';

@Controller('api/catalogos')
export class CatalogoController {
  constructor(private readonly service: CatalogoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Catalogo>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Catalogo>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
