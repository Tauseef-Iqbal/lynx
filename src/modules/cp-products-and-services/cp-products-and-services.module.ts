import { Module } from '@nestjs/common';
import { CpProductsAndServicesController } from './cp-products-and-services.controller';
import { ProductsAndServicesService } from './cp-products-and-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPProductsAndServicesEntity, CPProductsAndServicesMetadataEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPProductsAndServicesEntity, CPProductsAndServicesMetadataEntity])],
  controllers: [CpProductsAndServicesController],
  providers: [ProductsAndServicesService],
})
export class CpProductsAndServicesModule {}
