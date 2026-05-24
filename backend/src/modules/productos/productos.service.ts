import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/producto.entity';
import { Catalogo } from '../../entities/catalogo.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
  ) {}

  findAll(catalogo_id?: number, empresa_id?: number) {
    const where: any = {};
    if (catalogo_id) where.catalogo_id = catalogo_id;
    if (empresa_id) where.catalogo = { empresa_id };
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

  async findOneScoped(id: number, empresa_ids: number[]) {
    const item = await this.findOne(id);
    if (!empresa_ids.includes(item.catalogo.empresa_id)) {
      throw new ForbiddenException('No tienes acceso a este producto');
    }
    return item;
  }

  async create(data: Partial<Producto>, empresa_ids?: number[]) {
    if (empresa_ids && empresa_ids.length > 0 && data.catalogo_id) {
      const catalogo = await this.repo.manager.findOne(Catalogo, {
        where: { id: data.catalogo_id as number },
      });
      if (!catalogo || !empresa_ids.includes(catalogo.empresa_id)) {
        throw new ForbiddenException('No tienes acceso al catalogo de este producto');
      }
    }
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<Producto>, empresa_ids?: number[]) {
    const item = empresa_ids ? await this.findOneScoped(id, empresa_ids) : await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number, empresa_ids?: number[]) {
    const item = empresa_ids ? await this.findOneScoped(id, empresa_ids) : await this.findOne(id);
    return this.repo.remove(item);
  }
}
