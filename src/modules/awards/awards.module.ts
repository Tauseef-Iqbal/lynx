import { Module } from '@nestjs/common';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpAwardEntity, CpAwardsOfficalDocsEntity } from 'src/typeorm/models';
import { AwardsOfficialDocsService } from './award-official-docs.service';

@Module({
  imports: [TypeOrmModule.forFeature([CpAwardEntity, CpAwardsOfficalDocsEntity])],
  controllers: [AwardsController],
  providers: [AwardsService, AwardsOfficialDocsService],
})
export class AwardsModule {}
