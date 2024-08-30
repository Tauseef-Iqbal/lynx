import { Module } from '@nestjs/common';
import { CybersecurityService } from './cybersecurity.service';
import { CybersecurityController } from './cybersecurity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPCybersecurityEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPCybersecurityEntity])],
  providers: [CybersecurityService],
  controllers: [CybersecurityController],
})
export class CybersecurityModule {}
