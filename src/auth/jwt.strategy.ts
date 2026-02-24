// auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  async validate(payload: any) {
    try {
      const { sub: id } = payload;
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });

      if (!user) {
        throw new UnauthorizedException('Access denied: User not found');
      }
      return user;
    } catch (err) {
      console.error('Error in JWT Strategy:', err.message);
      throw err;
    }
  }
}
