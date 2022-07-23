import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/shared/decorator/PublicRoute.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic || super.canActivate(context);
  }

  handleRequest(err: Error, user: any, info: Record<string, any>) {
    if (err || !user) {
      throw err || new HttpException(info.message, HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
