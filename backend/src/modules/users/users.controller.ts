import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
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

  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<User>) {
    return this.usersService.update(+id, data);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
