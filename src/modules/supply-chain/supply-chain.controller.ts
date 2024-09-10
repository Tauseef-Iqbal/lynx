import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { UserEntity } from 'src/typeorm/models';
import { SupplyChainService } from './supply-chain.service';
import { AddSupplyChainDto, UpdateSupplyChainDto } from './dtos';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SupplyChainFiles } from './interfaces';

@ApiTags('Supply Chain')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('supply-chain')
export class SupplyChainController {
  constructor(private readonly supplyChainService: SupplyChainService) {}

  @ApiOperation({ summary: 'Add Supply Chain' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'suppliersBannedListFiles', maxCount: 10 },
        { name: 'supplierEthicalPracticesContractFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddSupplyChainDto })
  async addSupplyChain(@User() user: UserEntity, @Body() addSupplyChainDto: AddSupplyChainDto, @UploadedFiles() files: SupplyChainFiles) {
    const supplyChain = await this.supplyChainService.addSupplyChain(user, addSupplyChainDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Supply Chain added successfully!', supplyChain).toJSON();
  }

  @ApiOperation({ summary: 'Update Financial Health' })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'suppliersBannedListFiles', maxCount: 10 },
        { name: 'supplierEthicalPracticesContractFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateSupplyChainDto })
  async updateSupplyChain(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateSupplyChainDto: UpdateSupplyChainDto, @UploadedFiles() files: SupplyChainFiles) {
    const supplyChain = await this.supplyChainService.updateSupplyChain(id, user, updateSupplyChainDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Supply Chain updated successfully!', supplyChain).toJSON();
  }

  @ApiOperation({ summary: 'Get My Supply Chain' })
  @Get('section/me')
  async getMySupplyChain(@User() user: UserEntity) {
    const response = await this.supplyChainService.getMySupplyChain(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Supply Chain Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Supply Chain By ID' })
  @Get('/:id')
  async getSupplyChainById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.supplyChainService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Supply Chain Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Supply Chain By ID' })
  // @Delete('/:id')
  // async deleteSupplyChain(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.supplyChainService.update(id, { isDeleted: true } as unknown as CPSupplyChainEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Supply Chain Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Supply Chain' })
  // @Delete('section/me')
  // async deleteMySupplyChain(@User() user: UserEntity) {
  //   const response = await this.supplyChainService.deleteMySupplyChain(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Supply Chain Section deleted successfully!', response).toJSON();
  // }
}
