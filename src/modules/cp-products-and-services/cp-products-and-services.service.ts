import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpProductsAndServicesEntity } from 'src/typeorm/models';
import { CreateCpProductsAndServicesDto, UpdateCpProductsAndServicesDto } from './dtos';
import { CpProductsAndServicesFiles } from './interfaces';
import { CpProductsAndServicesMetaDataService } from './cp-products-and-services-metadata.service';
import { filesToUpdate, uploadFilesToS3 } from 'src/shared/utils';
import { MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_BYTES, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_MB } from 'src/shared/constants';

@Injectable()
export class CpProductsAndServicesService extends BaseTypeOrmCrudService<CpProductsAndServicesEntity> {
  constructor(
    @InjectRepository(CpProductsAndServicesEntity)
    readonly cpProductsAndServicesRepository: Repository<CpProductsAndServicesEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly cpProductsAndServicesMetaDataService: CpProductsAndServicesMetaDataService,
  ) {
    super(cpProductsAndServicesRepository);
  }

  async createCpProductsAndServices(user: any, createCpProductsAndServicesDto: CreateCpProductsAndServicesDto, files: CpProductsAndServicesFiles): Promise<CpProductsAndServicesEntity> {
    if (files.uploadedMaterials) {
      createCpProductsAndServicesDto.uploadedMaterials = await uploadFilesToS3(user, files.uploadedMaterials, createCpProductsAndServicesDto.name, this.s3Service, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_BYTES, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_MB);
    }

    const cpProductsAndServices = await this.create({ ...createCpProductsAndServicesDto, companyProfile: { id: user.companyProfile.id } } as unknown as CpProductsAndServicesEntity);

    await this.cpProductsAndServicesMetaDataService.upsertCpProductsAndServicesMetaData(user, cpProductsAndServices.id, createCpProductsAndServicesDto.metaData, files.supportingMaterials);

    return cpProductsAndServices;
  }

  async updateCpProductsAndService(id: number, user: any, updateProductsAndServicesDto: UpdateCpProductsAndServicesDto, files: CpProductsAndServicesFiles): Promise<CpProductsAndServicesEntity> {
    const cpProductOrService = await this.findById(id, { relations: { companyProfile: true, productsAndServicesMeta: true } });
    if (!cpProductOrService) {
      throw new Error('Company product or service not associated with this company profile');
    }

    if (files.uploadedMaterials) {
      updateProductsAndServicesDto.uploadedMaterials = await filesToUpdate(user, files.uploadedMaterials, cpProductOrService.uploadedMaterials, cpProductOrService.name, this.s3Service, this.configService, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_BYTES, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_MB);
    }

    if (updateProductsAndServicesDto.metaData && updateProductsAndServicesDto.metaData.length > 0) {
      await this.cpProductsAndServicesMetaDataService.upsertCpProductsAndServicesMetaData(user, id, updateProductsAndServicesDto.metaData, files.supportingMaterials);

      delete updateProductsAndServicesDto.metaData;
    }

    return this.update(id, updateProductsAndServicesDto as unknown as CpProductsAndServicesEntity);
  }
}
