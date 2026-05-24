import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '../../entities/role.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/roles')
@Roles('admin')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Role>) {
    return this.rolesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Role>) {
    return this.rolesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
