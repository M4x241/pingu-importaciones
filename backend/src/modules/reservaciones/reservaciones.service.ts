import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservacion } from '../../entities/reservacion.entity';

@Injectable()
export class ReservacionesService {
  constructor(
    @InjectRepository(Reservacion)
    private readonly repo: Repository<Reservacion>,
  ) {}

  findAll(user_id?: number) {
    const where = user_id ? { user_id } : {};
    return this.repo.find({
      where,
      relations: { user: true, detalleReservaciones: true },
      order: { fecha_reservacion: 'DESC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: { user: true, detalleReservaciones: { producto: true } },
    });
    if (!item) throw new NotFoundException(`Reservacion #${id} not found`);
    return item;
  }

  create(data: Partial<Reservacion>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<Reservacion>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
