import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { ResponseDto } from 'src/shared/dtos';

interface ClassType<T> {
  new (): T;
}

// use this interceptor where there is a specified response using a custom DTO
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, ResponseDto<T>> {
  constructor(private readonly classType?: ClassType<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((responseDTO: ResponseDto<T>) => {
        if (this.classType) {
          responseDTO.data = plainToClass(this.classType, responseDTO.data, {
            excludeExtraneousValues: true,
          });
        }
        return responseDTO;
      }),
    );
  }
}
