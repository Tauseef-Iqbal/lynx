import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPProductsAndServicesEntity, CPProductsAndServicesMetadataEntity, UserEntity } from 'src/typeorm/models';
import { CreateProductsAndServicesDto, UpdateProductsAndServicesDto } from './dtos';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';

@Injectable()
export class ProductsAndServicesService extends BaseTypeOrmCrudService<CPProductsAndServicesEntity> {
  constructor(
    @InjectRepository(CPProductsAndServicesEntity)
    readonly productsAndServicesRepository: Repository<CPProductsAndServicesEntity>,
    @InjectRepository(CPProductsAndServicesMetadataEntity)
    readonly productsAndServicesMetadataRepository: Repository<CPProductsAndServicesMetadataEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(productsAndServicesRepository);
  }

  async createProductsAndServices(user: UserEntity, createProductsAndServicesDto: CreateProductsAndServicesDto, files: Express.Multer.File[]): Promise<CPProductsAndServicesEntity> {
    const image: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith('image'));
    if (image) {
      createProductsAndServicesDto.image = (
        await processFilesToAdd({
          incomingFiles: image,
          incomingS3AndBase64: createProductsAndServicesDto.assets,
          keyPrefix: `${user.companyProfile.name}/Products And Services/${createProductsAndServicesDto.name}/Image`,
          configService: this.configService,
          s3Service: this.s3Service,
        })
      )[0];
    }

    const assets: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith('assets'));
    if (assets) {
      createProductsAndServicesDto.assets = await processFilesToAdd({
        incomingFiles: assets,
        incomingS3AndBase64: createProductsAndServicesDto.assets,
        keyPrefix: `${user.companyProfile.name}/Products And Services/${createProductsAndServicesDto.name}/Assets`,
        configService: this.configService,
        s3Service: this.s3Service,
        assetsMetadata: createProductsAndServicesDto.assetsMetadata,
      });
    }

    if (createProductsAndServicesDto.productsAndServicesMetadata && createProductsAndServicesDto.productsAndServicesMetadata.length) {
      await Promise.all(
        createProductsAndServicesDto.productsAndServicesMetadata.map(async (metadata, index) => {
          const assets: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith(`productsAndServicesMetadata[${index}][assets]`));
          metadata.assets = await processFilesToAdd({
            incomingFiles: assets,
            incomingS3AndBase64: metadata.assets,
            keyPrefix: `${user.companyProfile.name}/Products And Services/${createProductsAndServicesDto.name}/Additional Information/Assets`,
            configService: this.configService,
            s3Service: this.s3Service,
            assetsMetadata: metadata.assetsMetadata,
          });
        }),
      );
    }

    return this.create({ ...createProductsAndServicesDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPProductsAndServicesEntity);
  }

  async updateProductsAndServices(id: number, user: UserEntity, updateProductsAndServicesDto: UpdateProductsAndServicesDto, files: Express.Multer.File[]): Promise<CPProductsAndServicesEntity[]> {
    const existedProductsAndServices = (await this.getProductsAndServicesByFilter({ id, companyProfile: { id: user.companyProfile.id } }))[0];
    // if (!existedProductsAndServices) {
    //   throw new Error('Supply Chain not associated with this company profile');
    // }

    if (!existedProductsAndServices) return null;

    const image: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith('image'));
    updateProductsAndServicesDto.image = (
      await processFilesToUpdate({
        existingFiles: existedProductsAndServices.image ? [existedProductsAndServices.image] : [],
        incomingFiles: image || [],
        incomingS3AndBase64: updateProductsAndServicesDto.image ? [updateProductsAndServicesDto.image] : [],
        keyPrefix: `${user.companyProfile.name}/Products And Services/${updateProductsAndServicesDto.name}/Image`,
        configService: this.configService,
        s3Service: this.s3Service,
      })
    )[0];

    const assets: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith('assets'));
    updateProductsAndServicesDto.assets = await processFilesToUpdate({
      existingFiles: existedProductsAndServices.assets,
      incomingFiles: assets || [],
      incomingS3AndBase64: updateProductsAndServicesDto.assets,
      keyPrefix: `${user.companyProfile.name}/Products And Services/${updateProductsAndServicesDto.name}/Additional Information/Assets`,
      configService: this.configService,
      s3Service: this.s3Service,
      assetsMetadata: updateProductsAndServicesDto.assetsMetadata,
    });

    if (updateProductsAndServicesDto.productsAndServicesMetadata && updateProductsAndServicesDto.productsAndServicesMetadata.length) {
      await Promise.all(
        updateProductsAndServicesDto.productsAndServicesMetadata.map(async (metadata, index) => {
          const assets: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith(`productsAndServicesMetadata[${index}][assets]`));
          if (metadata.id) {
            const existingProductsAndServicesMetadata = await this.productsAndServicesMetadataRepository.findOne({ where: { id: metadata.id, productsAndServices: { id: existedProductsAndServices.id } } });
            if (!existingProductsAndServicesMetadata) throw new NotFoundException(`Products And Services Metadata with id ${metadata.id} isn't associated with the Products And Services with id ${id}`);

            metadata.assets = await processFilesToUpdate({
              existingFiles: existingProductsAndServicesMetadata.assets,
              incomingFiles: assets,
              incomingS3AndBase64: metadata.assets,
              keyPrefix: `${user.companyProfile.name}/Products And Services/${updateProductsAndServicesDto.name}/Additional Information/Assets`,
              configService: this.configService,
              s3Service: this.s3Service,
              assetsMetadata: metadata.assetsMetadata,
            });

            await this.productsAndServicesMetadataRepository.update(existingProductsAndServicesMetadata.id, metadata);
          } else {
            metadata.assets = await processFilesToAdd({
              incomingFiles: assets,
              incomingS3AndBase64: metadata.assets,
              keyPrefix: `${user.companyProfile.name}/Products And Services/${updateProductsAndServicesDto.name}/Additional Information/Assets`,
              configService: this.configService,
              s3Service: this.s3Service,
              assetsMetadata: metadata.assetsMetadata,
            });
            const newProductsAndServicesMetadata = this.productsAndServicesMetadataRepository.create({
              ...metadata,
              productsAndServices: existedProductsAndServices,
            });
            await this.productsAndServicesMetadataRepository.save(newProductsAndServicesMetadata);
          }
        }),
      );
      delete updateProductsAndServicesDto.productsAndServicesMetadata;
    } else {
      await this.productsAndServicesMetadataRepository.delete({ productsAndServices: { id: existedProductsAndServices.id } });
    }

    await this.update(id, updateProductsAndServicesDto as unknown as CPProductsAndServicesEntity);

    return this.getMyProductsAndServices(user.companyProfile.id);
  }

  async getMyProductsAndServices(companyProfileId: number): Promise<CPProductsAndServicesEntity[]> {
    const myProductsAndServices = await this.getProductsAndServicesByFilter({ companyProfile: { id: companyProfileId } });
    // if (!myProductsAndServices) {
    //   throw new NotFoundException('ProductsAndServices not found against your company profile');
    // }

    if (!myProductsAndServices) return null;

    return myProductsAndServices;
  }

  async getProductsAndServicesByFilter(filter: any): Promise<CPProductsAndServicesEntity[]> {
    const result = await this.findByRelationFilters(filter, {
      relations: {
        companyProfile: 'companyProfile',
        productsAndServicesMetadata: 'productsAndServicesMetadata',
      },
      relationFilters: {
        productsAndServicesMetadata: {
          condition: 'productsAndServicesMetadata.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
      },
      bulkFetch: true,
    });

    return Array.isArray(result) ? result : [];
  }
}
