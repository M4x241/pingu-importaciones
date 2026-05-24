import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogo } from '../../entities/catalogo.entity';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(Catalogo)
    private readonly repo: Repository<Catalogo>,
  ) {}

  findAll(empresa_id?: number) {
    const where = empresa_id ? { empresa_id } : {};
    return this.repo.find({ where, relations: { empresa: true, productos: true } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: { empresa: true, productos: true },
    });
    if (!item) throw new NotFoundException(`Catalogo #${id} not found`);
    return item;
  }

  async findOneScoped(id: number, empresa_ids: number[]) {
    const item = await this.findOne(id);
    if (!empresa_ids.includes(item.empresa_id)) {
      throw new ForbiddenException('No tienes acceso a este catalogo');
    }
    return item;
  }

  create(data: Partial<Catalogo>, empresa_ids?: number[]) {
    if (empresa_ids && data.empresa_id && !empresa_ids.includes(data.empresa_id)) {
      throw new ForbiddenException('No tienes acceso a esta empresa');
    }
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<Catalogo>, empresa_ids?: number[]) {
    const item = empresa_ids ? await this.findOneScoped(id, empresa_ids) : await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number, empresa_ids?: number[]) {
    const item = empresa_ids ? await this.findOneScoped(id, empresa_ids) : await this.findOne(id);
    return this.repo.remove(item);
  }
}
