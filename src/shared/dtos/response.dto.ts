import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T = any> {
  message: string;
  statusCode: number;
  data: T;

  constructor(status: HttpStatus, message: string, data?: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data !== undefined ? data : ({} as T);
  }

  toJSON() {
    let json = { statusCode: this.statusCode, message: this.message };
    if (this.data) json = { ...json, ...this.data };

    return json;
  }
}
