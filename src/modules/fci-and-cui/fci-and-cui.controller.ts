import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { FCIAndCUIService } from './fci-and-cui.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddFCIAndCUIDto, UpdateFCIAndCUIDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('FCI And CUI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('fci-and-cui')
export class FCIAndCUIController {
  constructor(private readonly fciAndcuiService: FCIAndCUIService) {}

  @ApiOperation({ summary: 'Add FCI And CUI' })
  @Post()
  async addFCIAndCUI(@User() user: UserEntity, @Body() addFCIAndCUIDto: AddFCIAndCUIDto) {
    const fciAndcui = await this.fciAndcuiService.addFCIAndCUI(user, addFCIAndCUIDto);
    return new ResponseDto(HttpStatus.CREATED, 'FCI And CUI added successfully!', fciAndcui).toJSON();
  }

  @ApiOperation({ summary: 'Update FCI And CUI' })
  @Put('/:id')
  async updateFCIAndCUI(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateFCIAndCUIDto: UpdateFCIAndCUIDto) {
    const fciAndcui = await this.fciAndcuiService.updateFCIAndCUI(id, user, updateFCIAndCUIDto);
    return new ResponseDto(HttpStatus.CREATED, 'FCI And CUI added successfully!', fciAndcui).toJSON();
  }

  @ApiOperation({ summary: 'Get My FCI And CUI' })
  @Get('section/me')
  async getMyFCIAndCUI(@User() user: UserEntity) {
    const response = await this.fciAndcuiService.getMyFCIAndCUI(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My FCIAndCUI Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get FCIAndCUI By ID' })
  @Get('/:id')
  async getFCIAndCUIById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.fciAndcuiService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'FCI And CUI Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete FCIAndCUI By ID' })
  // @Delete('/:id')
  // async deleteFCIAndCUI(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.fciAndcuiService.update(id, { isDeleted: true } as unknown as CPFCIAndCUIEntity);
  //   return new ResponseDto(HttpStatus.OK, 'FCI And CUI Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My FCI And CUI' })
  // @Delete('section/me')
  // async deleteMyFCIAndCUI(@User() user: UserEntity) {
  //   const response = await this.fciAndcuiService.deleteMyFCIAndCUI(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'FCI And CUI Section deleted successfully!', response).toJSON();
  // }
}
