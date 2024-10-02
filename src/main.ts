import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './shared/config/swagger.config';
import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: '*',
    },
    logger: false,
    bufferLogs: true,
  });
  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 3000;

  app.useLogger(app.get(PinoLogger));

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // if (['staging', 'production'].includes(config.get<string>('NODE_ENV'))) {
  app.use(
    ['/docs', '/docs-json', '/api/v1/api-docs'],
    basicAuth({
      challenge: true,
      users: {
        [config.get<string>('SWAGGER_USER')]: config.get<string>('SWAGGER_PASSWORD'),
      },
    }),
  );
  // }
  swaggerConfig(app);

  await app.listen(PORT);
  const logger = new Logger('Main');
  logger.log(`Application listening on port ${PORT}`);

  process.on('uncaughtException', (err) => logger.error(err, 'Uncaught Exception'));
  process.on('unhandledRejection', (reason, promise) => logger.error({ reason, promise }, 'Unhandled Rejection'));
}

bootstrap();
