import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetByIdDto {
  @ApiPropertyOptional({ required: false })
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class GetAllDto {
  @ApiPropertyOptional({ required: false, default: 10 })
  @Type(() => Number)
  @Min(1)
  @Max(500)
  @IsNumber()
  limit: number = 10;

  @ApiPropertyOptional({ required: false, default: 1 })
  @Type(() => Number)
  @Min(1)
  @IsNumber()
  page: number = 1;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cp_id?: number;
}
