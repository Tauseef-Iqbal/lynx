import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { GlobalJwtModule } from './jwt/jwt.module';
import { AuthModule } from './modules/auth';
import { CognitoModule } from './modules/cognito/cognito.module';
import { CompanyModule } from './modules/company';
import { CompanyProfileLegalStructureModule } from './modules/company-profile-legal-structure';
import { ContactUsModule } from './modules/contact-us';
import { GloabalCacheModule } from './modules/global/providers';
import { MailerModule } from './modules/mailer/mailer.module';
import { createLoggerOptions } from './shared/factories/pino-logger.factory';
import { HttpExceptionFilter } from './shared/filters/exception-filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { LoggerMiddleware } from './shared/middlewares';
import { dataSourceOptions } from './typeorm/orm.config';
import { GlobalModule } from './modules/global/global.module';
import { CompanyProfileModule } from './modules/company-profile';
import { FinancialHealthModule } from './modules/financial-health';
import { ToolsAndApplicationsModule } from './modules/tools-applications';
import { HealthModule } from './modules/health/health.module';
import { RevenueModule } from './modules/revenue';
import { CybersecurityModule } from './modules/cybersecurity';
import { FundingSourcesModule } from './modules/funding-sources';
import { OwnershipStructureModule } from './modules/ownership-structure/ownership-structure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createLoggerOptions,
    }),
    TypeOrmModule.forRoot({ ...dataSourceOptions }),
    HealthModule,
    GlobalModule,
    GloabalCacheModule,
    GlobalJwtModule,
    AuthModule,
    CognitoModule,
    CompanyModule,
    ContactUsModule,
    MailerModule,
    CompanyProfileModule,
    FinancialHealthModule,
    ToolsAndApplicationsModule,
    CompanyProfileLegalStructureModule,
    RevenueModule,
    CybersecurityModule,
    FundingSourcesModule,
    OwnershipStructureModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('/api/v1/health').forRoutes('*');
  }
}
