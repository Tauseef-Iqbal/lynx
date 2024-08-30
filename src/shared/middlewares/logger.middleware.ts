import { Injectable, NestMiddleware, Logger, LogLevel } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  private clc = {
    green: (text: string) => `\x1B[32m${text}\x1B[39m`,
    yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
    red: (text: string) => `\x1B[31m${text}\x1B[39m`,
    magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
    cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
  };

  private getColorByLogLevel(level: LogLevel) {
    switch (level) {
      case 'debug':
        return this.clc.magentaBright;
      case 'warn':
        return this.clc.yellow;
      case 'error':
        return this.clc.red;
      case 'verbose':
        return this.clc.cyanBright;
      default:
        return this.clc.green;
    }
  }

  private getColorByStatusCode(statusCode: number) {
    switch (true) {
      case statusCode < 300:
        return this.clc.green;
      case statusCode < 400:
        return this.clc.yellow;
      case statusCode < 600:
        return this.clc.red;
      default:
        return this.clc.cyanBright;
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const now = Date.now();

    res.on('close', () => {
      const { statusCode } = res;
      const statusColor = this.getColorByStatusCode(statusCode);
      const logLevel: LogLevel = statusCode >= 400 ? 'warn' : 'debug';
      const logColor = this.getColorByLogLevel(logLevel);

      this.logger.log(`${logColor(method)} ${originalUrl} ${statusColor(String(statusCode))} ${this.clc.yellow(Date.now() - now + 'ms')} - ${userAgent} ${ip}`);
    });

    next();
  }
}
