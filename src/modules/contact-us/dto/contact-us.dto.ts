import { IsString, Matches, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactUsDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[A-Za-z]+$/)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[A-Za-z]+$/)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\(\d{3}\) \d{3}-\d{4}$/)
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(5250)
  @IsNotEmpty()
  message: string;
}
