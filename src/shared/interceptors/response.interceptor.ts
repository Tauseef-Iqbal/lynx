import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dtos/response.dto';

export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        const httpResponse = context.switchToHttp().getResponse();

        if (response instanceof ResponseDto) {
          // If response is an instance of ResponseDto, use its properties
          httpResponse.status(response.statusCode);
          return response.toJSON();
        } else if (response && typeof response === 'object' && 'statusCode' in response) {
          // If response is a custom object with a statusCode property
          httpResponse.status(response.statusCode || HttpStatus.OK);
          return response;
        } else {
          // For plain data, return it directly with a default success message
          return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: response,
          };
        }
      }),
    );
  }
}
