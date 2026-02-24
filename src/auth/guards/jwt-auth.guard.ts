import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.headers && req.headers.authorization) {
          const authHeader = req.headers.authorization;
          if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
          }
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('Authentication token is missing or invalid')
      );
    }
    return user;
  }
}
