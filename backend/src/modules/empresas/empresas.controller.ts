import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { Empresa } from '../../entities/empresa.entity';

@Controller('api/empresas')
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Empresa>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Empresa>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
