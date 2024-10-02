import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';
import { CpAwardEntity, CpAwardsOfficalDocsEntity, UserEntity } from 'src/typeorm/models';
import { CpAwardsOfficalDocsDto } from './dtos';
import { uploadSingleBase64ToS3 } from 'src/shared/utils';

@Injectable()
export class AwardsOfficialDocsService extends BaseTypeOrmCrudService<CpAwardsOfficalDocsEntity> {
  constructor(
    @InjectRepository(CpAwardsOfficalDocsEntity)
    readonly cpAwardsOfficalDocsRepository: Repository<CpAwardsOfficalDocsEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cpAwardsOfficalDocsRepository);
  }

  async createOfficialDocs(user: any, officialDocs: CpAwardsOfficalDocsDto[], cpAward: CpAwardEntity): Promise<void> {
    await Promise.all(
      officialDocs.map(async (doc) => {
        if (doc.b64Images && doc.b64Images.length > 0) {
          const imageUrls = await Promise.all(doc.b64Images.map((base64) => uploadSingleBase64ToS3(user, base64, cpAward.nameOfAward, this.s3Service, this.configService, undefined, undefined, doc.fileName)));

          const cpAwardDoc = new CpAwardsOfficalDocsEntity();
          cpAwardDoc.name = doc.name;
          cpAwardDoc.urls = imageUrls;
          cpAwardDoc.cpAward = cpAward;

          await this.create(cpAwardDoc);
        }
      }),
    );
  }

  async updateOfficialDocs(user: UserEntity, officialDocs: CpAwardsOfficalDocsDto[], cpAward: CpAwardEntity): Promise<void> {
    const companyProfileFolder = user.companyProfile.name.replace(/\s+/g, '_');
    const awardFolder = cpAward.nameOfAward.replace(/\s+/g, '_');

    const existingDocs = await this.cpAwardsOfficalDocsRepository.find({
      where: { cpAward: { id: cpAward.id } },
    });

    if (existingDocs.length > 0) {
      await Promise.all(
        existingDocs.map(async (existingDoc) => {
          await Promise.all(
            existingDoc?.urls?.map(async (url) => {
              const key = url.split(`${companyProfileFolder}/${awardFolder}/`).pop();
              if (key) {
                await this.s3Service.deleteFile(key);
              }
            }),
          );

          await this.cpAwardsOfficalDocsRepository.remove(existingDoc);
        }),
      );
    }

    await Promise.all(
      officialDocs.map(async (doc) => {
        if (doc.b64Images && doc.b64Images.length > 0) {
          const imageUrls = await Promise.all(doc.b64Images.map((base64) => uploadSingleBase64ToS3(user, base64, cpAward.nameOfAward, this.s3Service, this.configService)));

          const cpAwardDoc = new CpAwardsOfficalDocsEntity();
          cpAwardDoc.name = doc.name;
          cpAwardDoc.urls = imageUrls;
          cpAwardDoc.cpAward = cpAward;
          await this.cpAwardsOfficalDocsRepository.save(cpAwardDoc);
        }
      }),
    );
  }

  async deleteOfficialDocs(user: UserEntity, cpAward: CpAwardEntity): Promise<void> {
    // const companyProfileFolder = user.companyProfile.name.replace(/\s+/g, '_');
    // const awardFolder = cpAward.nameOfAward.replace(/\s+/g, '_');

    const existingDocs = await this.cpAwardsOfficalDocsRepository.find({
      where: { cpAward: { id: cpAward.id } },
    });

    if (existingDocs.length > 0) {
      await Promise.all(
        existingDocs.map(async (existingDoc) => {
          // await Promise.all(
          // existingDoc.urls.map(async (url) => {
          // const key = url.split(`${companyProfileFolder}/${awardFolder}/`).pop();
          // if (key) {
          // await this.s3Service.deleteFile(key);
          // }
          // }),
          // );

          await this.cpAwardsOfficalDocsRepository.remove(existingDoc);
        }),
      );
    }
  }
}
