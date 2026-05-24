import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({ relations: { role: true, empresas: true, reservaciones: true } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: { role: true, empresas: true, reservaciones: true },
    });
    if (!item) throw new NotFoundException(`User #${id} not found`);
    return item;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email }, relations: { role: true, empresas: true } });
  }

  create(data: Partial<User>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<User>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
