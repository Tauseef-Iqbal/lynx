import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseControllerBaseDto {
  @IsString()
  @IsNotEmpty()
  entityName: string;
}

export class BaseControllerPostDto extends BaseControllerBaseDto {
  @ApiProperty({ description: 'Data for the entity', type: 'object' })
  @ValidateNested()
  @Type(() => Object)
  inputParams: any;
}

export class BaseControllerGetAllDto extends BaseControllerBaseDto {
  @ApiProperty({
    description: 'The page number for pagination',
    type: Number,
    required: false,
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'The number of records per page for pagination',
    type: Number,
    required: false,
    example: 10,
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;
}
