import { NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export class WrapInterceptor implements NestInterceptor {
  intercept(
    dataOrRequest: any,
    context: ExecutionContext,
    stream$: Observable<any>,
  ): Observable<any> {
    return stream$.pipe(map(response => ({ status: 'success', data: response })));
  }
}
