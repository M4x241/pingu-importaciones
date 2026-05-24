import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Empresa } from '../entities/empresa.entity';
import { Catalogo } from '../entities/catalogo.entity';
import { Producto } from '../entities/producto.entity';
import { Reservacion } from '../entities/reservacion.entity';
import { DetalleReservacion } from '../entities/detalle-reservacion.entity';
import * as crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // 1. Inicializar los repositorios primero
  const roleRepo = app.get(getRepositoryToken(Role));
  const userRepo = app.get(getRepositoryToken(User));
  const empresaRepo = app.get(getRepositoryToken(Empresa));
  const catalogoRepo = app.get(getRepositoryToken(Catalogo));
  const productoRepo = app.get(getRepositoryToken(Producto));
  const reservacionRepo = app.get(getRepositoryToken(Reservacion));
  const detalleRepo = app.get(getRepositoryToken(DetalleReservacion));

  console.log('   Limpiando tablas existentes...');

  // 2. Desactivar restricciones de llaves foráneas en MySQL
  await roleRepo.query('SET FOREIGN_KEY_CHECKS = 0;');

  // 3. Vaciar las tablas en orden
  await detalleRepo.clear();
  await reservacionRepo.clear();
  await productoRepo.clear();
  await catalogoRepo.clear();
  await empresaRepo.clear();
  await userRepo.clear();
  await roleRepo.clear();

  // 4. Volver a activar las restricciones de llaves foráneas
  await roleRepo.query('SET FOREIGN_KEY_CHECKS = 1;');

  console.log('   Insertando datos de prueba...');

  // ====== ROLES ======
  const roles = await roleRepo.save([
    { name: 'admin' },
    { name: 'empresa' },
    { name: 'cliente' },
  ]);

  // ====== USERS ======
  const users = await userRepo.save([
    {
      nombres: 'Admin',
      apellidos: 'Pingu',
      email: 'admin@pingu.com',
      password: hashPassword('admin123'),
      role_id: roles[0].id,
    },
    {
      nombres: 'TechImport',
      apellidos: 'SAS',
      email: 'empresa@pingu.com',
      password: hashPassword('empresa123'),
      role_id: roles[1].id,
    },
    {
      nombres: 'María',
      apellidos: 'García',
      email: 'maria@email.com',
      password: hashPassword('cliente123'),
      role_id: roles[2].id,
    },
    {
      nombres: 'Carlos',
      apellidos: 'López',
      email: 'carlos@email.com',
      password: hashPassword('cliente123'),
      role_id: roles[2].id,
    },
    {
      nombres: 'Ana',
      apellidos: 'Martínez',
      email: 'ana@email.com',
      password: hashPassword('cliente123'),
      role_id: roles[2].id,
    },
  ]);

  // ====== EMPRESAS ======
  const empresas = await empresaRepo.save([
    {
      nombre: 'TechImport SAS',
      nit: '900.123.456-7',
      telefono: '+57 300 123 4567',
      direccion: 'Cra 15 #45-67, Bogotá',
      user_id: users[1].id,
    },
    {
      nombre: 'FashionGlobal Ltda',
      nit: '900.789.012-3',
      telefono: '+57 301 987 6543',
      direccion: 'Clle 80 #20-30, Medellín',
      user_id: users[1].id,
    },
  ]);

  // ====== CATALOGOS ======
  const catalogos = await catalogoRepo.save([
    {
      empresa_id: empresas[0].id,
      titulo: 'Electrónicos 2026',
      descripcion: 'Los mejores gadgets y tecnología',
      fecha_creacion: new Date(),
      estado: 'activo',
      fecha_finalizacion: new Date('2026-12-31'),
    },
    {
      empresa_id: empresas[0].id,
      titulo: 'Audio Profesional',
      descripcion: 'Audífonos, parlantes y accesorios',
      fecha_creacion: new Date(),
      estado: 'activo',
      fecha_finalizacion: new Date('2026-12-31'),
    },
    {
      empresa_id: empresas[1].id,
      titulo: 'Moda Temporada',
      descripcion: 'Ropa y accesorios de última tendencia',
      fecha_creacion: new Date(),
      estado: 'activo',
      fecha_finalizacion: new Date('2026-09-30'),
    },
  ]);

  // ====== PRODUCTOS ======
  const productos = await productoRepo.save([
    {
      nombre: 'Audífonos Bluetooth Pro',
      descripcion: 'Cancelación de ruido activa, 30h de batería, sonido envolvente premium.',
      precio: 89.99,
      cantidad_minima: 10,
      cantidad_maxima: 100,
      categoria: 'Tecnología',
      cant_pedida: 7,
      imagen_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      catalogo_id: catalogos[0].id,
    },
    {
      nombre: 'Smartwatch Deportivo X200',
      descripcion: 'Monitor cardíaco, GPS integrado, resistente al agua 50m.',
      precio: 199.99,
      cantidad_minima: 5,
      cantidad_maxima: 50,
      categoria: 'Tecnología',
      cant_pedida: 3,
      imagen_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      catalogo_id: catalogos[0].id,
    },
    {
      nombre: 'Cámara Digital 4K Ultra',
      descripcion: 'Sensor 48MP, estabilización óptica, grabación 4K a 60fps.',
      precio: 449.99,
      cantidad_minima: 3,
      cantidad_maxima: 20,
      categoria: 'Tecnología',
      cant_pedida: 3,
      imagen_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
      catalogo_id: catalogos[0].id,
    },
    {
      nombre: 'Tablet 10.5" HD',
      descripcion: 'Pantalla retina, 256GB, chip ultrarrápido, lápiz táctil incluido.',
      precio: 329.99,
      cantidad_minima: 5,
      cantidad_maxima: 30,
      categoria: 'Hogar',
      cant_pedida: 5,
      imagen_url: 'https://images.unsplash.com/photo-1546868871-af0de0ae72da?w=400&h=300&fit=crop',
      catalogo_id: catalogos[0].id,
    },
    {
      nombre: 'Parlante Portátil Stereo',
      descripcion: 'Bluetooth 5.3, 20W, resistente al agua IPX7, 12h reproducción.',
      precio: 59.99,
      cantidad_minima: 15,
      cantidad_maxima: 100,
      categoria: 'Tecnología',
      cant_pedida: 8,
      imagen_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      catalogo_id: catalogos[1].id,
    },
    {
      nombre: 'Audífonos Deportivos Inalámbricos',
      descripcion: 'Resistentes al sudor, ajuste seguro, 8h batería, graves potentes.',
      precio: 49.99,
      cantidad_minima: 20,
      cantidad_maxima: 200,
      categoria: 'Deportes',
      cant_pedida: 14,
      imagen_url: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=300&fit=crop',
      catalogo_id: catalogos[1].id,
    },
    {
      nombre: 'Chaqueta Urbana Premium',
      descripcion: 'Material impermeable, diseño moderno, interior térmico.',
      precio: 129.99,
      cantidad_minima: 10,
      cantidad_maxima: 50,
      categoria: 'Ropa',
      cant_pedida: 10,
      imagen_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      catalogo_id: catalogos[2].id,
    },
    {
      nombre: 'Zapatillas Running Aero',
      descripcion: 'Amortiguación reactiva, suela Vibram, ultra ligeras 220g.',
      precio: 149.99,
      cantidad_minima: 5,
      cantidad_maxima: 30,
      categoria: 'Deportes',
      cant_pedida: 2,
      imagen_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      catalogo_id: catalogos[2].id,
    },
    {
      nombre: 'Mochila Viajera 40L',
      descripcion: 'Compartimento laptop, carga USB, material resistente al agua.',
      precio: 79.99,
      cantidad_minima: 10,
      cantidad_maxima: 50,
      categoria: 'Accesorios',
      cant_pedida: 6,
      imagen_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      catalogo_id: catalogos[2].id,
    },
    {
      nombre: 'Gorra Edición Limitada',
      descripcion: 'Diseño exclusivo Pingu, materiales premium, ajuste perfecto.',
      precio: 34.99,
      cantidad_minima: 20,
      cantidad_maxima: 100,
      categoria: 'Accesorios',
      cant_pedida: 20,
      imagen_url: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=300&fit=crop',
      catalogo_id: catalogos[2].id,
    },
  ]);

  // ====== RESERVACIONES ======
  const reservaciones = await reservacionRepo.save([
    {
      user_id: users[2].id,
      codigo_unico: 'RES-001-2026',
      fecha_reservacion: new Date('2026-05-15'),
      estado: 'entregado',
    },
    {
      user_id: users[3].id,
      codigo_unico: 'RES-002-2026',
      fecha_reservacion: new Date('2026-05-18'),
      estado: 'importando',
    },
    {
      user_id: users[4].id,
      codigo_unico: 'RES-003-2026',
      fecha_reservacion: new Date('2026-05-20'),
      estado: 'reservado',
    },
    {
      user_id: users[2].id,
      codigo_unico: 'RES-004-2026',
      fecha_reservacion: new Date('2026-05-22'),
      estado: 'entregado',
    },
  ]);

  // ====== DETALLE RESERVACION ======
  await detalleRepo.save([
    {
      reservacion_id: reservaciones[0].id,
      product_id: productos[0].id,
      cantidad_pedida: 2,
      precio_unitario: 89.99,
    },
    {
      reservacion_id: reservaciones[0].id,
      product_id: productos[3].id,
      cantidad_pedida: 1,
      precio_unitario: 329.99,
    },
    {
      reservacion_id: reservaciones[1].id,
      product_id: productos[1].id,
      cantidad_pedida: 1,
      precio_unitario: 199.99,
    },
    {
      reservacion_id: reservaciones[2].id,
      product_id: productos[6].id,
      cantidad_pedida: 1,
      precio_unitario: 129.99,
    },
    {
      reservacion_id: reservaciones[3].id,
      product_id: productos[4].id,
      cantidad_pedida: 3,
      precio_unitario: 59.99,
    },
    {
      reservacion_id: reservaciones[3].id,
      product_id: productos[7].id,
      cantidad_pedida: 1,
      precio_unitario: 149.99,
    },
  ]);

  console.log('   Seed completado exitosamente');
  console.log('   Credenciales de prueba:');
  console.log('   Admin:   admin@pingu.com / admin123');
  console.log('   Empresa: empresa@pingu.com / empresa123');
  console.log('   Cliente: maria@email.com / cliente123');

  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
