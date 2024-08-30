import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactUsDto } from './dto';
import { ContactUsService } from './contact-us.service';

@ApiTags('Contact Us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @ApiOperation({ summary: 'Contact Us' })
  @Post()
  async contactUs(@Body() contactUsDto: ContactUsDto) {
    await this.contactUsService.contactUs(contactUsDto);
    return new ResponseDto(HttpStatus.OK, 'Contact Us message received. You will receive an email shortly.').toJSON();
  }
}
