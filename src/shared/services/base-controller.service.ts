import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetAllDto } from '../dtos/common.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { BaseTypeOrmCrudService } from './base-typeorm-crud.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export abstract class BaseController<Entity, Dto> {
  private service: BaseTypeOrmCrudService<Entity>;

  constructor(service: BaseTypeOrmCrudService<Entity>) {
    this.service = service;
  }

  @Post()
  async create(@Body() inputParams: Dto) {
    return await this.service.create(inputParams as unknown as Entity);
  }

  @Get()
  async findAll(@Query() inputParams: GetAllDto, options?: any) {
    return await this.service.findAll(inputParams, options);
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number, options?: any) {
    return await this.service.findById(id, options);
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() inputParams: Dto) {
    return await this.service.update(id, inputParams as unknown as Entity);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.update(id, { isDeleted: true } as Dto);
  }
}
