import { Module } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { SupplyChainController } from './supply-chain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPSupplyChainEntity } from 'src/typeorm/models';
import { CPSupplyChainSupplierEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPSupplyChainEntity, CPSupplyChainSupplierEntity])],
  providers: [SupplyChainService],
  controllers: [SupplyChainController],
})
export class SupplyChainModule {}
