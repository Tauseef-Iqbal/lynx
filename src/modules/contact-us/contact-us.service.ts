import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUsDto } from './dto/contact-us.dto';
import { ContactUsEntity } from 'src/typeorm/models';
import { SESService } from '../global/providers';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUsEntity)
    private readonly contactUsRepository: Repository<ContactUsEntity>,
    private readonly sesService: SESService,
  ) {}

  async contactUs(data: ContactUsDto) {
    await this.contactUsRepository.insert(data);
    await this.sesService.sendEmail(data);
    return true;
  }
}
