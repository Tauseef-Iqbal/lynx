import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpProductsAndServicesMetaDataEntity } from 'src/typeorm/models';
import { CpProductsAndServicesMetaDataDto } from './dtos';
import { filesToDelete, uploadFilesToS3 } from 'src/shared/utils';
import { MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_BYTES, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_MB } from 'src/shared/constants';

@Injectable()
export class CpProductsAndServicesMetaDataService extends BaseTypeOrmCrudService<CpProductsAndServicesMetaDataEntity> {
  constructor(
    @InjectRepository(CpProductsAndServicesMetaDataEntity)
    readonly cpProductsAndServicesMetaRepository: Repository<CpProductsAndServicesMetaDataEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cpProductsAndServicesMetaRepository);
  }

  private S3FolderName = 'CpProductsAndServicesAdditionalInformation';

  private async deleteObseleteRecords(user: any, cpProductsAndServicesMetaDtos: CpProductsAndServicesMetaDataDto[]) {
    const idsToKeep = cpProductsAndServicesMetaDtos.map((cpProductsAndServicesMetaDto) => cpProductsAndServicesMetaDto.id).filter((id) => Boolean(id));
    const additionalInfosToDel = await this.cpProductsAndServicesMetaRepository.createQueryBuilder(CpProductsAndServicesMetaDataEntity.name).where('id NOT IN (:ids)', { ids: idsToKeep }).getMany();

    const filestToBeDeletedFromS3 = additionalInfosToDel.map((addInfo) => addInfo.supportingMaterials).flatMap((a) => a);
    await filesToDelete(user, filestToBeDeletedFromS3, this.s3Service, this.S3FolderName);
    await this.cpProductsAndServicesMetaRepository.delete(additionalInfosToDel.map((addInfo) => addInfo.id));
  }

  private async deleteCpProductsAndServicesMetaDtos(user, cpProductsAndServicesId: number) {
    const additionalIfos = await this.cpProductsAndServicesMetaRepository.createQueryBuilder('metaData').where(`${'metaData.cp_products_and_services_id'} = :value`, { value: cpProductsAndServicesId }).getMany();

    const s3URLsToDelete = additionalIfos.map((addInfo) => addInfo.supportingMaterials).flatMap((a) => a);
    await filesToDelete(user, s3URLsToDelete, this.s3Service, this.S3FolderName);

    await this.cpProductsAndServicesMetaRepository.createQueryBuilder().delete().from(CpProductsAndServicesMetaDataEntity).where(`${'cp_products_and_services_id'} = :value`, { value: cpProductsAndServicesId }).execute();
  }

  async upsertCpProductsAndServicesMetaData(user: any, cpProductsAndServicesId: number, cpProductsAndServicesMetaDtos?: CpProductsAndServicesMetaDataDto[], supportingMaterials?: Express.Multer.File[]): Promise<void> {
    if (cpProductsAndServicesMetaDtos?.length > 0) {
      await this.deleteCpProductsAndServicesMetaDtos(user, cpProductsAndServicesId);

      let supportingMaterialsUrls;

      if (supportingMaterials) {
        supportingMaterialsUrls = await uploadFilesToS3(user, supportingMaterials, this.S3FolderName, this.s3Service, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_BYTES, MAX_CP_PRODUCT_AND_SERVICES_FILE_SIZE_MB);
      }

      const additionalInfoPromises = cpProductsAndServicesMetaDtos.map((cpProductsAndServicesMetaDto) => {
        const { fileIndices, ...remaning } = cpProductsAndServicesMetaDto;

        const rowData = {
          ...remaning,
          cpProductsAndServicesId,
        };

        if (fileIndices) {
          // @ts-expect-error supportingMaterials conditionally adds into rowData
          rowData.supportingMaterials = fileIndices.map((i) => supportingMaterialsUrls[i]);
        }

        this.create({
          ...rowData,
        } as unknown as CpProductsAndServicesMetaDataEntity);
      });

      await Promise.all(additionalInfoPromises);
    }
  }
}
