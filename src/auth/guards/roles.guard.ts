import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authorizedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!authorizedRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasPermission = authorizedRoles.includes(user.role?.name);

    if (!hasPermission) {
      throw new ForbiddenException(
        'Access denied: your role does not have permission for this action',
      );
    }

    return true;
  }
}
