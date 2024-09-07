import { Module } from '@nestjs/common';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';
import { CpCertificationsEntity } from 'src/typeorm/models';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CpCertificationsEntity])],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
