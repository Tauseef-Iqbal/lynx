import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { UserEntity } from 'src/typeorm/models';
import { AddLegalStructureDto, UpdateLegalStructureDto } from './dtos';
import { LegalStructureFiles } from './interfaces';
import { LegalStructureService } from './legal-structure.service';

@ApiTags('Legal Structure')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('legal-structure')
export class LegalStructureController {
  constructor(private readonly legalStructureService: LegalStructureService) {}

  @ApiOperation({ summary: 'Add Legal Structure' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'assets', maxCount: 10 },
        { name: 'dbaNameFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddLegalStructureDto })
  async addLegalStructure(@User() user: any, @Body() addLegalStructureDto: AddLegalStructureDto, @UploadedFiles() files: LegalStructureFiles) {
    const legalStructure = await this.legalStructureService.addLegalStructure(user, addLegalStructureDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Legal Structure added successfully!', legalStructure).toJSON();
  }

  @ApiOperation({ summary: 'Update Legal Structure' })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'assets', maxCount: 10 },
        { name: 'dbaNameFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateLegalStructureDto })
  async updateLegalStructure(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateLegalStructureDto: UpdateLegalStructureDto, @UploadedFiles() files: LegalStructureFiles) {
    const legalStructure = await this.legalStructureService.updateLegalStructure(id, user, updateLegalStructureDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Legal Structure updated successfully!', legalStructure).toJSON();
  }

  @ApiOperation({ summary: 'Get My Legal Structure' })
  @Get('section/me')
  async getMyLegalStructure(@User() user: UserEntity) {
    const response = await this.legalStructureService.getMyLegalStructure(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Legal Structure Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Get Legal Structure By ID' })
  // @Get('/:id')
  // async getLegalStructureById(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.legalStructureService.findById(id, { relations: { legalStructureForeignAffiliation: true } });
  //   return new ResponseDto(HttpStatus.OK, 'Legal Structure Section fetched successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete Legal Structure By ID' })
  // @Delete('/:id')
  // async deleteLegalStructure(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.legalStructureService.update(id, { isDeleted: true } as unknown as CPLegalStructureEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Legal Structure Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Legal Structure' })
  // @Delete('section/me')
  // async deleteMyLegalStructure(@User() user: UserEntity) {
  //   const response = await this.legalStructureService.deleteMyLegalStructure(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Legal Structure Section deleted successfully!', response).toJSON();
  // }
}
