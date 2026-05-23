import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
  ) {}

  findAll(catalogo_id?: number) {
    const where = catalogo_id ? { catalogo_id } : {};
    return this.repo.find({
      where,
      relations: { catalogo: true },
    });
  }

  findFeatured() {
    return this.repo.find({ take: 8, relations: { catalogo: true } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: { catalogo: true, detalleReservaciones: true },
    });
    if (!item) throw new NotFoundException(`Producto #${id} not found`);
    return item;
  }

  create(data: Partial<Producto>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<Producto>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
