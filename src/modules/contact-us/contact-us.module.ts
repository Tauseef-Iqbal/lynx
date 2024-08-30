import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUsEntity } from 'src/typeorm/models';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUsEntity])],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
