import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PERMISSION_KEY } from 'src/shared/decorator/Authorize.decorator';
import { AppPermissions } from '../permissions';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<AppPermissions[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();
    const { permissions } = user;

    if (permissions) {
      return requiredPermissions.every((permission) => permissions.includes(permission));
    }

    return false;
  }
}
