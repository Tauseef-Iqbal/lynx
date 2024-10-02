import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { GlobalJwtModule } from './jwt/jwt.module';
import { AuthModule } from './modules/auth';
import { CognitoModule } from './modules/cognito/cognito.module';
import { CompanyModule } from './modules/company';
import { CompanyProfileLegalStructureModule } from './modules/legal-structure';
import { ContactUsModule } from './modules/contact-us';
import { MailerModule } from './modules/mailer/mailer.module';
import { createLoggerOptions } from './shared/factories';
import { HttpExceptionFilter } from './shared/filters/exception-filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { LoggerMiddleware } from './shared/middlewares';
import { dataSourceOptions } from './typeorm/orm.config';
import { CpProductsAndServicesModule } from './modules/cp-products-and-services/cp-products-and-services.module';
import { GlobalModule } from './modules/global/global.module';
import { CompanyProfileModule } from './modules/company-profile';
import { FinancialHealthModule } from './modules/financial-health';
import { ToolsAndApplicationsModule } from './modules/tools-applications';
import { HealthModule } from './modules/health/health.module';
import { RevenueModule } from './modules/revenue';
import { CybersecurityModule } from './modules/cybersecurity';
import { FundingSourcesModule } from './modules/funding-sources';
import { OwnershipStructureModule } from './modules/ownership-structure/ownership-structure.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PastPerformanceModule } from './modules/past-performance/past-performance.module';
import { CertificationsModule } from './modules/certifications/certifications.module';
import { AwardsModule } from './modules/awards/awards.module';
import { BusinessGoalsModule } from './modules/business-goals';
import { BusinessInfoModule } from './modules/advanced-business-information/cp-advanced-business-info.module';
import { RequiredSystemModule } from './modules/cp-required-system';
import { SupplyChainModule } from './modules/supply-chain';
import { PersonnelModule } from './modules/personnel';
import { PointsOfContactModule } from './modules/points-of-contact';
import { DataComplianceDocumentationModule } from './modules/data-compliance-documentation/data-compliance-documentation.module';
import { ResearchAndDevelopmentModule } from './modules/research-and-development';
import { DataManagementAndStorageModule } from './modules/data-management-and-storage';
import { FCIAndCUIModule } from './modules/fci-and-cui';
import { CompanyOrverviewModule } from './modules/company-orverview/company-orverview.module';
import { ControlsAndProtocolsModule } from './modules/controls-and-protocols/controls-and-protocols.module';

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
    TypeOrmModule.forRoot(dataSourceOptions),
    EventEmitterModule.forRoot(),
    HealthModule,
    GlobalModule,
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
    CpProductsAndServicesModule,
    OwnershipStructureModule,
    PastPerformanceModule,
    CertificationsModule,
    AwardsModule,
    BusinessGoalsModule,
    BusinessInfoModule,
    RequiredSystemModule,
    SupplyChainModule,
    PersonnelModule,
    PointsOfContactModule,
    ResearchAndDevelopmentModule,
    DataComplianceDocumentationModule,
    ControlsAndProtocolsModule,
    DataManagementAndStorageModule,
    FCIAndCUIModule,
    CompanyOrverviewModule,
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
