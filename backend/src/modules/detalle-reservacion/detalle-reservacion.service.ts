import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleReservacion } from '../../entities/detalle-reservacion.entity';

@Injectable()
export class DetalleReservacionService {
  constructor(
    @InjectRepository(DetalleReservacion)
    private readonly repo: Repository<DetalleReservacion>,
  ) {}

  findAll() {
    return this.repo.find({ relations: { reservacion: true, producto: true } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: { reservacion: true, producto: true },
    });
    if (!item) throw new NotFoundException(`DetalleReservacion #${id} not found`);
    return item;
  }

  create(data: Partial<DetalleReservacion>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<DetalleReservacion>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
