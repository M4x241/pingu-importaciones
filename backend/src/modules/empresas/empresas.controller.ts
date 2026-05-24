import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { Empresa } from '../../entities/empresa.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/empresas')
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Roles('admin')
  @Post()
  create(@Body() data: Partial<Empresa>) {
    return this.service.create(data);
  }

  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Empresa>) {
    return this.service.update(+id, data);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
