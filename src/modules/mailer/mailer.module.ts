import { Module } from '@nestjs/common';
import { SESService } from 'src/modules/global/providers';

@Module({
  imports: [],
  controllers: [],
  providers: [SESService],
  exports: [],
})
export class MailerModule {}
