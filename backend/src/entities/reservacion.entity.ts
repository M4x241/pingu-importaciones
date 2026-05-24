import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { DetalleReservacion } from './detalle-reservacion.entity';

export enum EstadoReservacion {
  RESERVADO = 'reservado',
  ENTREGADO = 'entregado',
  IMPORTANDO = 'importando',
}

@Entity('reservaciones')
export class Reservacion {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  user_id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  codigo_unico: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_reservacion: Date;

  @Column({ type: 'enum', enum: EstadoReservacion, default: EstadoReservacion.RESERVADO })
  estado: EstadoReservacion;

  @ManyToOne(() => User, (user) => user.reservaciones)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => DetalleReservacion, (detalle) => detalle.reservacion)
  detalleReservaciones: DetalleReservacion[];
}
