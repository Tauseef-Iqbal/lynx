import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const existedSupplyChain = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedSupplyChain) {
      return this.updateSupplyChain(existedSupplyChain.id, user, addSupplyChainDto, files);
    }

    if (files.suppliersBannedListFiles) {
      if (!addSupplyChainDto.suppliersBannedList) throw new BadRequestException('suppliersBannedListFiles should not be provided when suppliersBannedList does not meet the required condition.');
      addSupplyChainDto.suppliersBannedListFiles = await processFilesToAdd({
        incomingFiles: files.suppliersBannedListFiles,
        incomingS3AndBase64: addSupplyChainDto.suppliersBannedListFiles,
        keyPrefix: `${user.companyProfile.name}/${SupplyChainFilesCategory.SuppliersBannedListFiles}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (files.supplierEthicalPracticesContractFiles) {
      if (!addSupplyChainDto.supplierEthicalPracticesContract) throw new BadRequestException('supplierEthicalPracticesContractFiles should not be provided when supplierEthicalPracticesContract does not meet the required condition.');
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
    const existedSupplyChain = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true, supplyChainSupplier: true } });
    // if (!existedSupplyChain) {
    //   throw new Error('Supply Chain not associated with this company profile');
    // }

    if (!existedSupplyChain) return null;

    if (files.suppliersBannedListFiles || updateSupplyChainDto.suppliersBannedListFiles) {
      if (files.suppliersBannedListFiles && !updateSupplyChainDto.suppliersBannedList) throw new BadRequestException('suppliersBannedListFiles should not be provided when suppliersBannedList does not meet the required condition.');
      updateSupplyChainDto.suppliersBannedListFiles = await processFilesToUpdate({
        existingFiles: existedSupplyChain.suppliersBannedListFiles,
        incomingFiles: files.suppliersBannedListFiles,
        incomingS3AndBase64: updateSupplyChainDto.suppliersBannedListFiles,
        keyPrefix: `${existedSupplyChain.companyProfile.name}/${SupplyChainFilesCategory.SuppliersBannedListFiles}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (files.supplierEthicalPracticesContractFiles || updateSupplyChainDto.supplierEthicalPracticesContractFiles) {
      if (files.supplierEthicalPracticesContractFiles && !updateSupplyChainDto.supplierEthicalPracticesContract) throw new BadRequestException('supplierEthicalPracticesContractFiles should not be provided when supplierEthicalPracticesContract does not meet the required condition.');
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
      if (supplyChainSupplier.id) {
        const existingSupplyChainSupplier = await this.supplyChainSupplierRepository.findOne({ where: { id: supplyChainSupplier.id, isDeleted: false } });
        if (!existingSupplyChainSupplier) throw new NotFoundException(`Supply Chain Supplier with id ${supplyChainSupplier.id} isn't associated with the Supply Chain with id ${id}`);
        await this.supplyChainSupplierRepository.update(existingSupplyChainSupplier.id, supplyChainSupplier);
      } else {
        const newOwnershipStructureDetails = this.supplyChainSupplierRepository.create({
          ...supplyChainSupplier,
          supplyChain: existedSupplyChain,
        });
        await this.supplyChainSupplierRepository.save(newOwnershipStructureDetails);
        delete updateSupplyChainDto.supplyChainSupplier;
      }
    }

    return this.update(id, updateSupplyChainDto as unknown as CPSupplyChainEntity);
  }

  async getMySupplyChain(companyProfileId: number): Promise<CPSupplyChainEntity> {
    const mySupplyChain = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false }, { relations: { supplyChainSupplier: true } });
    // if (!mySupplyChain) {
    //   throw new NotFoundException('Supply Chain not found against your company profile');
    // }

    if (!mySupplyChain) return null;

    return mySupplyChain;
  }

  async deleteMySupplyChain(companyProfileId: number): Promise<CPSupplyChainEntity> {
    const mySupplyChain = await this.getMySupplyChain(companyProfileId);
    return this.update(mySupplyChain.id, { isDeleted: true } as unknown as CPSupplyChainEntity);
  }
}
