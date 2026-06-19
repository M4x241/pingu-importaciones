import { Controller, Get, Post, Body, Param, Put, Delete, Req, ForbiddenException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    if (req.user?.role === 'admin' || req.user?.id === +id) {
      return this.usersService.findOne(+id);
    }
    return { id: +id, nombres: '', apellidos: '', email: '', role: '' };
  }

  @Roles('admin')
  @Post()
  create(@Body() data: Partial<User>) {
    return this.usersService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<User> & { password?: string }, @Req() req: any) {
    if (req.user?.role !== 'admin' && req.user?.id !== +id) {
      throw new ForbiddenException('No puedes editar este perfil');
    }
    const allowed: Record<string, boolean> = {
      nombres: true, apellidos: true, email: true, password: true,
    };
    if (req.user?.role === 'admin') {
      allowed.role_id = true;
    }
    const filtered: any = {};
    for (const key of Object.keys(data)) {
      if (allowed[key]) {
        filtered[key] = (data as any)[key];
      }
    }
    if (filtered.password) {
      filtered.password = crypto.createHash('sha256').update(filtered.password).digest('hex');
    }
    return this.usersService.update(+id, filtered);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
