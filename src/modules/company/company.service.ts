import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { promises as fs } from 'fs';

import { CompanyEntity, SocialMediaEntity, ComapnyInfoEntity, CompanyResourceEntity } from '../../typeorm/models';
import { convertKeysToCamelCase, getDomain } from '../../shared/utils/basic.utils';
import { AddCompanyInfoDto, CompanyInfoDto, ResourceDto, CreateCompanyDto, SaveCompanyInfoDto, SearchCompanyDto } from './dto';
import { S3Service } from 'src/modules/global/providers';
import ApiError from 'src/shared/utils/api.error';
import { requestHelper } from 'src/shared/utils';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(SocialMediaEntity)
    private readonly socialMediaRepository: Repository<SocialMediaEntity>,
    @InjectRepository(CompanyResourceEntity)
    private readonly resourceRepository: Repository<CompanyResourceEntity>,
    @InjectRepository(ComapnyInfoEntity)
    private readonly companyInfoRepository: Repository<ComapnyInfoEntity>,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {}

  async saveCompanyOverviewAndMissionStatement(companyId: number, saveCompanyInfoDto: SaveCompanyInfoDto) {
    const { overview, missionStatement } = saveCompanyInfoDto;
    await this.companyRepository.update({ id: companyId }, { overview, missionStatement });
    return this.findById(companyId);
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const converted = convertKeysToCamelCase(createCompanyDto) as unknown as ComapnyInfoEntity;
    const website = getDomain(createCompanyDto.website);
    if (!website) throw new ApiError(500, 'Invalid website.');

    converted.website = website;
    const companies = await this.companyRepository.find({
      where: { website, isDeleted: false },
    });

    if (companies.length == 0) {
      return {
        success: true,
        companyExists: false,
        message: 'Company with specified website not found.',
      };
    }

    const companiesInfo = await this.companyInfoRepository.find({
      where: { website },
    });
    await this.companyRepository.update({ id: In(companies.map(({ id }) => id)) }, { infoReady: true });

    if (companiesInfo.length > 0) {
      await this.companyInfoRepository.update({ id: In(companiesInfo.map(({ id }) => id)) }, converted);
      return { success: true, message: 'Info updated.' };
    }

    await Promise.all(
      companies.map((company) =>
        this.companyInfoRepository.insert({
          ...converted,
          company: { id: company.id },
        }),
      ),
    );
    return { success: true, message: 'Info created.' };
  }

  async getVendors(params: any) {
    let url = this.configService.get<string>('ML_SERVICE_URL') + '/vendors';
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url += '?' + queryParams;
    }
    const { data } = await axios.get(url);
    return data;
  }

  async findById(id: number) {
    return this.companyRepository.findOne({
      where: { isDeleted: false, id },
      relations: ['socialMedia', 'resources', 'info'],
    });
  }

  async saveCompanyInfo(userId: number, addCompanyInfoDto: AddCompanyInfoDto) {
    const queryRunner = this.companyRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const website = getDomain(addCompanyInfoDto.website);
      if (!website) throw new ApiError(500, 'Invalid website.');

      const { socialMedia, resources, ...rest } = addCompanyInfoDto;
      await this.companyRepository.update({ user: { id: userId } }, rest);

      const company = await this.companyRepository.findOne({
        where: { user: { id: userId }, isDeleted: false },
      });
      await this.socialMediaRepository.update({ company: { id: company.id } }, socialMedia);

      if (resources) await this.addCompanyResources(resources, company.id);

      await queryRunner.commitTransaction();
      await this.createCompanyInfo({ company_name: rest.name, company_url: rest.website }, company.id);
      return await this.findById(company.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMyCompany(userId: number) {
    return this.companyRepository.findOne({
      where: { user: { id: userId } },
      relations: ['socialMedia', 'resources', 'info'],
    });
  }

  async searchCompany(searchCompanyDto: SearchCompanyDto) {
    return this.getVendors(searchCompanyDto);
  }

  async createCompanyInfo(companyData: CompanyInfoDto, companyId: number) {
    try {
      const url = this.configService.get<string>('ML_SERVICE_URL') + '/company_profile';
      const searchParams = new URLSearchParams(companyData as any).toString();
      const data = await requestHelper.get(`${url}?${searchParams}`);

      if (data && data.Data && data.Data[0]) {
        const dataExists = await this.companyInfoRepository.findOne({
          where: { company: { id: companyId }, isDeleted: false },
        });
        if (!dataExists) {
          const converted = convertKeysToCamelCase(data.Data[0]);
          await this.companyInfoRepository.insert({
            ...converted,
            company: { id: companyId },
          });
          await this.companyRepository.update({ id: companyId }, { infoReady: true });
        }
      }
      return data;
    } catch (error) {
      return {};
    }
  }

  async addCompanyResources(resources: ResourceDto[], companyId?: number) {
    await this.resourceRepository.delete({ company: { id: companyId } });

    const mappedResources = [];

    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      const now = Date.now();
      const fileName = `${now}-${resource.name}`;
      const path = `uploads/${fileName}`;

      let source = resource.source;
      if (source && source.includes(';base64,')) {
        source = source.split(';base64,').pop();
      }

      const buffer = Buffer.from(resource.source, 'base64');
      await fs.writeFile(path, buffer);

      mappedResources.push({
        ...resource,
        source: `${this.configService.get<string>('AWS_S3_BASE_LINK')}/${fileName}`,
        company: { id: companyId },
        metaData: await this.s3Service.uploadFile(path, fileName, false),
        fileName: fileName,
      });
    }

    await this.resourceRepository.insert(mappedResources);
  }
}
