// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async validateUserCredentials(dto: LoginDto) {
    const { email, password } = dto;

    const identity = await this.userRepo.findOne({
      where: { email },
      relations: ['role'],
      select: ['id', 'email', 'password', 'name'],
    });

    if (!identity) {
      throw new UnauthorizedException('Invalid login attempts');
    }

    const isAuthentic = await bcrypt.compare(password, identity.password);
    if (!isAuthentic) {
      throw new UnauthorizedException('Invalid login attempts');
    }

    const payload = {
      username: identity.name,
      sub: identity.id,
      role: identity.role,
    };

    return {
      token: this.jwtService.sign(payload),
      profile: {
        id: identity.id,
        name: identity.name,
        role: identity.role,
      },
    };
  }
}
