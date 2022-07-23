import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from './interceptor.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const [{ res }] = context.getArgs();
    const { statusCode } = res;

    return next.handle().pipe(map(data => ({ statusCode, data, message: 'success' })));
  }
}