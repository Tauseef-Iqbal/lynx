import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dtos/company-profile.dto';
import { CompanyProfileEntity } from 'src/typeorm/models/company-profile.entity';
import { S3Service } from 'src/modules/global/providers';
import { ConfigService } from '@nestjs/config';
import { Assets } from './interfaces';

@Injectable()
export class CompanyProfileService extends BaseTypeOrmCrudService<CompanyProfileEntity> {
  constructor(
    @InjectRepository(CompanyProfileEntity) readonly companyRepository: Repository<CompanyProfileEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(companyRepository);
  }

  async createCompanyProfile(user: any, createCompanyProfileDto: CreateCompanyProfileDto, files: Assets): Promise<CompanyProfileEntity> {
    if (files.assets) {
      const assets = [];
      for (const file of files.assets) {
        const key = `${createCompanyProfileDto.name}/${file.originalname}`;
        await this.s3Service.uploadBuffer(file.buffer, key);
        const fileUrl = `${this.configService.get<string>('AWS_S3_PUBLIC_LINK')}${key}`;
        assets.push(fileUrl);
      }
      createCompanyProfileDto.assets = assets;
    }
    return await this.create({ ...createCompanyProfileDto, userProfile: { id: user.id } } as any as CompanyProfileEntity);
  }

  async updateCompanyProfile(id: number, updateCompanyPrfileDto: UpdateCompanyProfileDto, files: Assets): Promise<CompanyProfileEntity> {
    const company = await this.findById(id);
    if (!company) {
      throw new Error('Company not found');
    }

    if (files.assets) {
      const existingAssets = company.assets || [];
      const incomingAssets = [];

      for (const file of files.assets) {
        const incomingBlobName = `${updateCompanyPrfileDto.name}/${file.originalname}`;
        const fileUrl = `${this.configService.get<string>('BLOB_CONTAINER_URL')}/${incomingBlobName}`;
        incomingAssets.push(fileUrl);

        const existingAssetIndex = existingAssets.findIndex((asset) => {
          const existingBlobName = asset.split(`${company.name}/`).pop();
          return existingBlobName === file.originalname;
        });

        if (existingAssetIndex !== -1) {
          await this.s3Service.deleteFile(`${company.name}/${existingAssets[existingAssetIndex].split(`${company.name}/`).pop()}`);
          existingAssets[existingAssetIndex] = fileUrl;
        } else {
          existingAssets.push(fileUrl);
        }

        await this.s3Service.uploadBuffer(file.buffer, incomingBlobName);
      }

      const assetsToDelete = existingAssets.filter((existingAsset) => {
        const existingBlobName = existingAsset.split(`${company.name}/`).pop();
        return !incomingAssets.some((incomingAsset) => {
          const incomingBlobName = incomingAsset.split(`${company.name}/`).pop();
          return existingBlobName === incomingBlobName;
        });
      });

      for (const assetToDelete of assetsToDelete) {
        await this.s3Service.deleteFile(`${company.name}/${assetToDelete.split(`${company.name}/`).pop()}`);
        existingAssets.splice(existingAssets.indexOf(assetToDelete), 1);
      }

      updateCompanyPrfileDto.assets = existingAssets;
    }

    return await this.update(id, updateCompanyPrfileDto as unknown as CompanyProfileEntity);
  }

  async deleteCompany(id: number): Promise<void> {
    await this.delete(id);
  }
}
