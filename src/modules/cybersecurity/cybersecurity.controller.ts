import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CybersecurityService } from './cybersecurity.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddCybersecurityDto, UpdateCybersecurityDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';

@ApiTags('Cybersecurity')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cybersecurity')
export class CybersecurityController {
  constructor(private readonly cybersecurityService: CybersecurityService) {}

  @ApiOperation({ summary: 'Add Cybersecurity' })
  @Post()
  async addCybersecurity(@User() user: UserEntity, @Body() addCybersecurityDto: AddCybersecurityDto) {
    const cybersecurity = await this.cybersecurityService.addCybersecurity(user, addCybersecurityDto);
    return new ResponseDto(HttpStatus.CREATED, 'Cybersecurity added successfully!', cybersecurity).toJSON();
  }

  @ApiOperation({ summary: 'Update Cybersecurity' })
  @Put('/:id')
  async updateCybersecurity(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateCybersecurityDto: UpdateCybersecurityDto) {
    const cybersecurity = await this.cybersecurityService.updateCybersecurity(id, user, updateCybersecurityDto);
    return new ResponseDto(HttpStatus.CREATED, 'Cybersecurity added successfully!', cybersecurity).toJSON();
  }

  @ApiOperation({ summary: 'Get My Cybersecurity' })
  @Get('section/me')
  async getMyCybersecurity(@User() user: UserEntity) {
    const response = await this.cybersecurityService.getMyCybersecurity(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Cybersecurity Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Cybersecurity By ID' })
  @Get('/:id')
  async getCybersecurityById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.cybersecurityService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Cybersecurity Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Cybersecurity By ID' })
  // @Delete('/:id')
  // async deleteCybersecurity(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.cybersecurityService.update(id, { isDeleted: true } as unknown as CPCybersecurityEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Cybersecurity Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Cybersecurity' })
  // @Delete('section/me')
  // async deleteMyCybersecurity(@User() user: UserEntity) {
  //   const response = await this.cybersecurityService.deleteMyCybersecurity(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Cybersecurity Section deleted successfully!', response).toJSON();
  // }
}
