import { Module } from '@nestjs/common';
import { CpProductsAndServicesController } from './cp-products-and-services.controller';
import { CpProductsAndServicesService } from './cp-products-and-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpProductsAndServicesEntity, CpProductsAndServicesMetaDataEntity } from 'src/typeorm/models';
import { CpProductsAndServicesMetaDataService } from './cp-products-and-services-metadata.service';

@Module({
  imports: [TypeOrmModule.forFeature([CpProductsAndServicesEntity, CpProductsAndServicesMetaDataEntity])],
  controllers: [CpProductsAndServicesController],
  providers: [CpProductsAndServicesService, CpProductsAndServicesMetaDataService],
})
export class CpProductsAndServicesModule {}
