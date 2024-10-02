import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPSupplyChainEntity, CPSupplyChainSupplierEntity, UserEntity } from 'src/typeorm/models';
import { AddSupplyChainDto, UpdateSupplyChainDto } from './dtos';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';
import { SupplyChainFiles } from './interfaces';
import { SupplyChainFilesCategory } from './enums';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';

@Injectable()
export class SupplyChainService extends BaseTypeOrmCrudService<CPSupplyChainEntity> {
  constructor(
    @InjectRepository(CPSupplyChainEntity)
    readonly supplyChainRepository: Repository<CPSupplyChainEntity>,
    @InjectRepository(CPSupplyChainSupplierEntity)
    readonly supplyChainSupplierRepository: Repository<CPSupplyChainSupplierEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(supplyChainRepository);
  }

  async addSupplyChain(user: UserEntity, addSupplyChainDto: AddSupplyChainDto, files: SupplyChainFiles): Promise<CPSupplyChainEntity> {
    const existedSupplyChain = await this.getSupplyChainByFilter({ companyProfile: { id: user.companyProfile.id } });
    if (existedSupplyChain) {
      return this.updateSupplyChain(existedSupplyChain.id, user, addSupplyChainDto, files);
    }

    if (addSupplyChainDto?.suppliersBannedList && files?.suppliersBannedListFiles.length) {
      addSupplyChainDto.suppliersBannedListFiles = await processFilesToAdd({
        incomingFiles: files.suppliersBannedListFiles,
        incomingS3AndBase64: addSupplyChainDto.suppliersBannedListFiles,
        keyPrefix: `${user.companyProfile.name}/${SupplyChainFilesCategory.SuppliersBannedListFiles}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (addSupplyChainDto?.supplierEthicalPracticesContract && files?.supplierEthicalPracticesContractFiles.length) {
      addSupplyChainDto.supplierEthicalPracticesContractFiles = await processFilesToAdd({
        incomingFiles: files.supplierEthicalPracticesContractFiles,
        incomingS3AndBase64: addSupplyChainDto.supplierEthicalPracticesContractFiles,
        keyPrefix: `${user.companyProfile.name}/${SupplyChainFilesCategory.SupplierEthicalPracticesContractFiles}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    return this.create({ ...addSupplyChainDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPSupplyChainEntity);
  }

  async updateSupplyChain(id: number, user: UserEntity, updateSupplyChainDto: UpdateSupplyChainDto, files: SupplyChainFiles): Promise<CPSupplyChainEntity> {
    const existedSupplyChain = await this.getSupplyChainByFilter({ id, companyProfile: { id: user.companyProfile.id } });
    // if (!existedSupplyChain) {
    //   throw new Error('Supply Chain not associated with this company profile');
    // }

    if (!existedSupplyChain) return null;

    if (updateSupplyChainDto?.suppliersBannedList && (files?.suppliersBannedListFiles?.length || updateSupplyChainDto?.suppliersBannedListFiles?.length)) {
      updateSupplyChainDto.suppliersBannedListFiles = await processFilesToUpdate({
        existingFiles: existedSupplyChain.suppliersBannedListFiles,
        incomingFiles: files.suppliersBannedListFiles,
        incomingS3AndBase64: updateSupplyChainDto.suppliersBannedListFiles,
        keyPrefix: `${existedSupplyChain.companyProfile.name}/${SupplyChainFilesCategory.SuppliersBannedListFiles}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateSupplyChainDto?.supplierEthicalPracticesContract && (files?.supplierEthicalPracticesContractFiles?.length || updateSupplyChainDto?.supplierEthicalPracticesContractFiles?.length)) {
      updateSupplyChainDto.supplierEthicalPracticesContractFiles = await processFilesToUpdate({
        existingFiles: existedSupplyChain.supplierEthicalPracticesContractFiles,
        incomingFiles: files.supplierEthicalPracticesContractFiles,
        incomingS3AndBase64: updateSupplyChainDto.supplierEthicalPracticesContractFiles,
        keyPrefix: `${existedSupplyChain.companyProfile.name}/${SupplyChainFilesCategory.SupplierEthicalPracticesContractFiles}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    const { supplyChainSupplier } = updateSupplyChainDto;
    if (supplyChainSupplier) {
      if (existedSupplyChain.supplyChainSupplier) {
        await this.supplyChainSupplierRepository.update(existedSupplyChain.supplyChainSupplier.id, supplyChainSupplier);
      } else {
        const newOwnershipStructureDetails = this.supplyChainSupplierRepository.create({
          ...supplyChainSupplier,
          supplyChain: existedSupplyChain,
        });
        await this.supplyChainSupplierRepository.save(newOwnershipStructureDetails);
      }
      delete updateSupplyChainDto.supplyChainSupplier;
    } else {
      await this.supplyChainSupplierRepository.delete({ supplyChain: { id: existedSupplyChain.id } });
    }

    await this.update(id, updateSupplyChainDto as unknown as CPSupplyChainEntity);

    return this.getMySupplyChain(user.companyProfile.id);
  }

  async getMySupplyChain(companyProfileId: number): Promise<CPSupplyChainEntity> {
    const mySupplyChain = await this.getSupplyChainByFilter({ companyProfile: { id: companyProfileId } });
    // if (!mySupplyChain) {
    //   throw new NotFoundException('Supply Chain not found against your company profile');
    // }

    if (!mySupplyChain) return null;

    return mySupplyChain;
  }

  async getSupplyChainByFilter(filter: any): Promise<CPSupplyChainEntity> {
    const result = await this.findByRelationFilters(filter, {
      relations: {
        companyProfile: 'companyProfile',
        supplyChainSupplier: 'supplyChainSupplier',
      },
      relationFilters: {
        supplyChainSupplier: {
          condition: 'supplyChainSupplier.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
      },
    });

    return result as CPSupplyChainEntity;
  }

  async deleteMySupplyChain(companyProfileId: number): Promise<CPSupplyChainEntity> {
    const mySupplyChain = await this.getMySupplyChain(companyProfileId);
    return this.update(mySupplyChain.id, { isDeleted: true } as unknown as CPSupplyChainEntity);
  }
}
