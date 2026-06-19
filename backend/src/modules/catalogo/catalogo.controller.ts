import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { Catalogo } from '../../entities/catalogo.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/catalogos')
export class CatalogoController {
  constructor(private readonly service: CatalogoService) {}

  @Public()
  @Get()
  findAll(@Query('empresa_id') empresa_id?: string) {
    return this.service.findAll(empresa_id ? +empresa_id : undefined);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Roles('admin', 'empresa')
  @Post()
  create(@Body() data: Partial<Catalogo>, @CurrentUser() user: any) {
    return this.service.create(data, user?.empresa_ids);
  }

  @Roles('admin', 'empresa')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Catalogo>, @CurrentUser() user: any) {
    return this.service.update(+id, data, user?.empresa_ids);
  }

  @Roles('admin', 'empresa')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(+id, user?.empresa_ids);
  }
}
