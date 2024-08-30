import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder().addBearerAuth().setTitle('LYNX API').setDescription('Backend APIs for LYNX').setVersion('2.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/api-docs', app, document, {
    customSiteTitle: 'LYNX Swagger API',
  });
};
