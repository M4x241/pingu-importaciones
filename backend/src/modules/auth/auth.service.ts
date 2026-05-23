import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    if (user.password !== this.hashPassword(password)) return null;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role?.name || 'cliente' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role?.name || 'cliente',
      },
    };
  }

  async register(data: { nombres: string; apellidos: string; email: string; password: string; role_id: number }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) throw new ConflictException('El correo ya está registrado');

    const user = await this.usersService.create({
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      password: this.hashPassword(data.password),
      role_id: data.role_id,
    });

    return this.login(user);
  }
}
