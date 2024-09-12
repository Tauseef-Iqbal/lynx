import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ErrorResponse } from '../interfaces';
import { Response, Request } from 'express';
import { AxiosError } from 'axios';
import { ValidationError } from 'class-validator';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();
    console.log(request.id);

    const status = exception.getStatus ? exception.getStatus() : 400;
    let errorMessage = exception?.message || 'Bad Request';
    let details = undefined;

    if (typeof exception === 'string') errorMessage = exception;
    else if (exception.getResponse && typeof exception.getResponse() === 'object') {
      const exceptionResp = exception.getResponse() as ErrorResponse;
      if (exceptionResp.error) errorMessage = exceptionResp.error;
      if (exceptionResp.message && typeof exceptionResp.message === 'string') errorMessage = exceptionResp.message;
      if (exceptionResp.message && typeof exceptionResp.message === 'object') details = exceptionResp.message;
    } else if (Array.isArray(exception) && exception.every((item) => item instanceof ValidationError)) {
      details = this.formatValidationErrorsArray(exception);
    } else if (exception instanceof ValidationError) {
      details = this.formatValidationErrorsArray([exception]);
    } else if (exception instanceof AxiosError) {
      const err: any = exception;
      if (err.response?.data) {
        if (err.response.data?.msg) errorMessage = err.response.data.msg;
        details = err.response.data;
      }
    }

    response.status(status).json({
      statusCode: status,
      msg: errorMessage,
      message: errorMessage,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  private formatValidationErrorsArray(validationErrors: ValidationError[]): string[] {
    return validationErrors.flatMap((err) => this.formatSingleValidationError(err));
  }

  private formatSingleValidationError(error: ValidationError): string[] {
    const messages: string[] = [];
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        messages.push(...this.formatSingleValidationError(child));
      });
    }
    return messages;
  }
}
