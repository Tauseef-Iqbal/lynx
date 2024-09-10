import { Body, Controller, Get, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { DataComplianceDocumentationService } from './data-compliance-documentation.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { UserEntity } from 'src/typeorm/models';
import { ResponseDto } from 'src/shared/dtos';
import { UpsertDataComplianceDocumentationDto } from './dtos/data-compliance-documentation.dto';
import { JwtAuthGuard } from 'src/shared/guards';

@ApiTags('DataComplianceDocumentation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('data-compliance-documentation')
export class DataComplianceDocumentationController {
  constructor(private readonly dataComplianceDocumentationService: DataComplianceDocumentationService) {}

  @ApiOperation({ summary: 'Add DataComplianceDocumentation' })
  @Post()
  async addBusinessGoals(@User() user: UserEntity, @Body() upsertDataComplianceDocumentationDto: UpsertDataComplianceDocumentationDto) {
    const dataComplianceDocumentation = await this.dataComplianceDocumentationService.upsertDataComplianceDocumentation(user, upsertDataComplianceDocumentationDto);
    return new ResponseDto(HttpStatus.CREATED, 'DataComplianceDocumentation added successfully!', dataComplianceDocumentation).toJSON();
  }

  @ApiOperation({ summary: 'Update DataComplianceDocumentation' })
  @Put()
  async updateBusinessGoals(@User() user: UserEntity, @Body() upsertDataComplianceDocumentationDto: UpsertDataComplianceDocumentationDto) {
    const dataComplianceDocumentation = await this.dataComplianceDocumentationService.upsertDataComplianceDocumentation(user, upsertDataComplianceDocumentationDto);
    return new ResponseDto(HttpStatus.CREATED, 'DataComplianceDocumentation updated successfully!', dataComplianceDocumentation).toJSON();
  }

  @ApiOperation({ summary: 'Get My DataComplianceDocumentation' })
  @Get()
  async getMyDataComplianceDocumentation(@User() user: UserEntity) {
    const response = await this.dataComplianceDocumentationService.getMyDataComplianceDocumentation(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My DataComplianceDocumentation fetched successfully!', response).toJSON();
  }
}
