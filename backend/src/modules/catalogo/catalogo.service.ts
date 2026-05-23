import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogo } from '../../entities/catalogo.entity';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(Catalogo)
    private readonly repo: Repository<Catalogo>,
  ) {}

  findAll() {
    return this.repo.find({ relations: { empresa: true, productos: true } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: { empresa: true, productos: true },
    });
    if (!item) throw new NotFoundException(`Catalogo #${id} not found`);
    return item;
  }

  create(data: Partial<Catalogo>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: number, data: Partial<Catalogo>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
