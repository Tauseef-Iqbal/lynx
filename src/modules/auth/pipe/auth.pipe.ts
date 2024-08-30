import { PipeTransform, Injectable } from '@nestjs/common';
import xss from 'xss';

@Injectable()
export class SanitizeInputPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return xss(value);
    }
    if (typeof value === 'object') {
      return this.sanitizeObject(value);
    }
    return value;
  }

  private sanitizeObject(obj: any) {
    const sanitizedObject = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitizedObject[key] = typeof obj[key] === 'string' ? xss(obj[key]) : obj[key];
      }
    }
    return sanitizedObject;
  }
}
