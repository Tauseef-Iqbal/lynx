import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ResearchAndDevelopmentService } from './research-and-development.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddResearchAndDevelopmentDto, UpdateResearchAndDevelopmentDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Research And Development')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('research-and-development')
export class ResearchAndDevelopmentController {
  constructor(private readonly researchAndDevelopmentService: ResearchAndDevelopmentService) {}

  @ApiOperation({ summary: 'Add Research And Development' })
  @Post()
  async addResearchAndDevelopment(@User() user: UserEntity, @Body() addResearchAndDevelopmentDto: AddResearchAndDevelopmentDto) {
    const researchAndDevelopment = await this.researchAndDevelopmentService.addResearchAndDevelopment(user, addResearchAndDevelopmentDto);
    return new ResponseDto(HttpStatus.CREATED, 'Research And Development added successfully!', researchAndDevelopment).toJSON();
  }

  @ApiOperation({ summary: 'Update Research And Development' })
  @Put('/:id')
  async updateResearchAndDevelopment(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateResearchAndDevelopmentDto: UpdateResearchAndDevelopmentDto) {
    const researchAndDevelopment = await this.researchAndDevelopmentService.updateResearchAndDevelopment(id, user, updateResearchAndDevelopmentDto);
    return new ResponseDto(HttpStatus.CREATED, 'Research And Development updated successfully!', researchAndDevelopment).toJSON();
  }

  @ApiOperation({ summary: 'Get My Research And Development' })
  @Get('section/me')
  async getMyCybersecurity(@User() user: UserEntity) {
    const response = await this.researchAndDevelopmentService.getMyResearchAndDevelopment(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Research And Development fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Research And Development' })
  @Get('/:id')
  async getMyResearchAndDevelopmentByID(@Param('id', ParseIntPipe) id: number) {
    const response = await this.researchAndDevelopmentService.findById(id, { relations: { projectsAwarded: true } });
    return new ResponseDto(HttpStatus.OK, 'Research And Development fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Research And Development' })
  // @Delete('/:id')
  // async deleteMyResearchAndDevelopmentByID(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.researchAndDevelopmentService.update(id, { isDeleted: true } as unknown as CPResearchAndDevelopmentEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Research And Development deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Research And Development' })
  // @Delete('section/me')
  // async deleteMyResearchAndDevelopment(@User() user: UserEntity) {
  //   const response = await this.researchAndDevelopmentService.deleteMyResearchAndDevelopment(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'My ResearchAndDevelopment deleted successfully!', response).toJSON();
  // }
}
