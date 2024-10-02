import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { BaseController } from 'src/shared/services';
import { UserEntity } from 'src/typeorm/models';
import { CpAwardEntity } from 'src/typeorm/models/cp-awards.entity';
import { AwardsService } from './awards.service';
import { SaveCpAwardDto, UpdateCpAwardDto } from './dtos';
import { ResponseDto } from 'src/shared/dtos';

@ApiTags('Company Awards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('awards')
export class AwardsController extends BaseController<CpAwardEntity, SaveCpAwardDto | UpdateCpAwardDto> {
  constructor(private readonly awardService: AwardsService) {
    super(awardService);
  }

  @ApiOperation({ summary: 'Add Company List Awards' })
  @ApiBody({
    description: 'company award save dto',
    type: [SaveCpAwardDto],
  })
  @Post()
  async saveAwards(@User() user: UserEntity, @Body() data: SaveCpAwardDto[]) {
    const award = await this.awardService.saveAwards(user, data);
    return new ResponseDto(HttpStatus.CREATED, 'Company award save successfully!', award).toJSON();
  }

  @ApiOperation({ summary: 'Get Company Profile Legal Structure' })
  @Get(':id')
  async getCompanyProfileLegalStructureById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const response = await this.findById(id, { relations: { officialDocs: true } });
    return new ResponseDto(HttpStatus.OK, 'Award fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get My Awards' })
  @Get()
  async getMyAwards(@User() user: UserEntity) {
    const response = await this.awardService.getMyAwards(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Awards fetched successfully!', { awards: response }).toJSON();
  }

  @ApiOperation({ summary: 'Update Company Award' })
  @Put(':id')
  async updateAward(@User() user: any, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateCpAwardDto) {
    const award = await this.awardService.updateAward(user, id, data);
    return new ResponseDto(HttpStatus.OK, 'Company award update successfully!', award);
  }

  @ApiOperation({ summary: 'Delete Company profile award' })
  @Delete(':id')
  async deleteCpProductsAndServicesById(@Param('id') id: number): Promise<void> {
    await this.awardService.softDelete(id);
  }
}
