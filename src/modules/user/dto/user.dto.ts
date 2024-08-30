import { PartialType } from '@nestjs/swagger';
import { SignupDto } from 'src/modules/auth/dto';

export class CreateUserDto extends PartialType(SignupDto) {}
