import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Catalogo } from './catalogo.entity';
import { DetalleReservacion } from './detalle-reservacion.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', unsigned: true })
  cantidad_minima: number;

  @Column({ type: 'int', unsigned: true })
  cantidad_maxima: number;

  @Column({ type: 'varchar', length: 500 })
  imagen_url: string;

  @Column({ type: 'bigint', unsigned: true })
  catalogo_id: number;

  @ManyToOne(() => Catalogo, (catalogo) => catalogo.productos)
  @JoinColumn({ name: 'catalogo_id' })
  catalogo: Catalogo;

  @OneToMany(() => DetalleReservacion, (detalle) => detalle.producto)
  detalleReservaciones: DetalleReservacion[];
}
