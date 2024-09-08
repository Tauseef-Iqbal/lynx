import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { POCType } from 'src/modules/points-of-contact/enums';

export class AddPointsOfContactDto {
  @ApiProperty({ description: 'Name of the point of contact', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({ description: 'Title of the point of contact', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ description: 'Phone number of the point of contact', maxLength: 255 })
  @IsNotEmpty()
  @IsPhoneNumber(null)
  @Length(1, 255)
  phone: string;

  @ApiProperty({ description: 'Email of the point of contact', maxLength: 255 })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({ description: 'Type of point of contact', enum: POCType })
  @IsNotEmpty()
  @IsEnum(POCType)
  type: POCType;
}

export class UpdatePointsOfContactDto extends PartialType(AddPointsOfContactDto) {}
