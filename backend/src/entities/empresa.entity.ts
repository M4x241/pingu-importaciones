import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Catalogo } from './catalogo.entity';

@Entity('Empresas')
export class Empresa {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  nit: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.empresas)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Catalogo, (catalogo) => catalogo.empresa)
  catalogos: Catalogo[];
}
