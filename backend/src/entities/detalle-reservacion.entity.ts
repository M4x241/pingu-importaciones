import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reservacion } from './reservacion.entity';
import { Producto } from './producto.entity';

@Entity('detalle_reservacion')
export class DetalleReservacion {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  reservacion_id: number;

  @Column({ type: 'bigint', unsigned: true })
  product_id: number;

  @Column({ type: 'int', unsigned: true })
  cantidad_pedida: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @ManyToOne(() => Reservacion, (reservacion) => reservacion.detalleReservaciones)
  @JoinColumn({ name: 'reservacion_id' })
  reservacion: Reservacion;

  @ManyToOne(() => Producto, (producto) => producto.detalleReservaciones)
  @JoinColumn({ name: 'product_id' })
  producto: Producto;
}
