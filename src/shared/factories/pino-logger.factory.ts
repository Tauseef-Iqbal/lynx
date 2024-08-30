import { ConfigService } from '@nestjs/config';

export function createLoggerOptions(configService: ConfigService) {
  return {
    pinoHttp: {
      level: configService.get('NODE_ENV') !== 'production' ? 'debug' : 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
        },
      },
      serializers: {
        req: (req) => ({
          id: req.id,
          method: req.method,
          url: req.url,
          body: req.raw.body,
          ip: req.raw.ip,
          headers: {
            'user-agent': req.raw.headers['user-agent'],
          },
        }),
        res: (res) => ({
          statusCode: res.statusCode,
        }),
      },
      customProps: () => ({
        context: 'HTTP',
      }),
    },
  };
}
