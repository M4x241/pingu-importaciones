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

  findAll(user_id?: number, empresa_id?: number) {
    if (empresa_id) {
      return this.repo.createQueryBuilder('reservacion')
        .innerJoinAndSelect('reservacion.user', 'user')
        .innerJoinAndSelect('reservacion.detalleReservaciones', 'detalle')
        .innerJoin('detalle.producto', 'producto')
        .innerJoin('producto.catalogo', 'catalogo')
        .where('catalogo.empresa_id = :empresa_id', { empresa_id })
        .orderBy('reservacion.fecha_reservacion', 'DESC')
        .getMany();
    }
    const where = user_id ? { user_id } : {};
    return this.repo.find({
      where,
      relations: { user: true, detalleReservaciones: { producto: true } },
      order: { fecha_reservacion: 'DESC' },
    });
  }

  async findOne(id: number, user_id?: number) {
    const where: any = { id };
    if (user_id) where.user_id = user_id;
    const item = await this.repo.findOne({
      where,
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
