import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Role,
  User,
  Empresa,
  Catalogo,
  Producto,
  Reservacion,
  DetalleReservacion,
} from './entities';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { CatalogoModule } from './modules/catalogo/catalogo.module';
import { ProductosModule } from './modules/productos/productos.module';
import { ReservacionesModule } from './modules/reservaciones/reservaciones.module';
import { DetalleReservacionModule } from './modules/detalle-reservacion/detalle-reservacion.module';
import { AuthModule } from './modules/auth/auth.module';
import { PayPalModule } from './modules/paypal/paypal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [
          Role,
          User,
          Empresa,
          Catalogo,
          Producto,
          Reservacion,
          DetalleReservacion,
        ],
        synchronize: config.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    RolesModule,
    UsersModule,
    EmpresasModule,
    CatalogoModule,
    ProductosModule,
    ReservacionesModule,
    DetalleReservacionModule,
    AuthModule,
    PayPalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
