import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import ApiError from 'src/shared/utils/api.error';
import { Repository } from 'typeorm';
import { CompanyEntity, SocialMediaEntity, UserEntity, UserRepresentationEntity } from '../../typeorm/models';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(UserRepresentationEntity) private readonly userRepresentationEntityRepository: Repository<UserRepresentationEntity>,
    @InjectRepository(CompanyEntity) private readonly companyEntityRepository: Repository<CompanyEntity>,
    @InjectRepository(SocialMediaEntity) private readonly companySocialMediaRepository: Repository<SocialMediaEntity>,
  ) {}

  saveForgotPasswordUuid(email: string, uuid: string) {
    return this.userEntityRepository.update({ email }, { forgotPasswordUuid: uuid });
  }

  async findUserByEmail(email: string) {
    const res = await this.userEntityRepository.findOne({
      where: { email, isDeleted: false },
      relations: {
        company: { socialMedia: true, resources: true, info: true },
        representation: true,
        companyProfile: true,
      },
    });

    return res;
  }

  async setEmailVerified({ email }: { email: string }) {
    await this.userEntityRepository.update({ email }, { emailVerified: true, updatedAt: new Date() });

    return this.findByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto) {
    await validateOrReject(createUserDto);
    const email = createUserDto.email.toLowerCase();
    const user = await this.userEntityRepository.findOne({
      where: { email, isDeleted: false },
    });
    if (user) throw new ApiError(500, 'Email already exists.');

    // const password = await hash(createUserDto.password, 12);

    delete createUserDto.password;

    const newParams = this.userEntityRepository.create(createUserDto);
    // password
    // representation: { createdAt: new Date() },
    // company: { createdAt: new Date(), resources: { createdAt: new Date() }, socialMedia: { createdAt: new Date() } }

    const newUser = await this.userEntityRepository.save(newParams);

    await this.userRepresentationEntityRepository.save(
      this.userRepresentationEntityRepository.create({
        user: { id: newUser.id },
      }),
    );
    const company = await this.companyEntityRepository.save(this.companyEntityRepository.create({ user: { id: newUser.id } }));
    await this.companySocialMediaRepository.insert({
      company: { id: company.id },
    });

    // await this.companyResourcesRepository.insert({ company: { id: company.id } });

    return this.findById(newUser.id);
  }

  async findByEmail(email: string) {
    const user = await this.userEntityRepository.findOne({
      where: { email, isDeleted: false },
      relations: {
        company: { socialMedia: true, resources: true, info: true },
        representation: true,
      },
    });

    if (!user) throw new ApiError(404, 'Invalid Email. User not found.');

    return user;
  }

  async findById(id: number) {
    const user = await this.userEntityRepository.findOne({
      where: { id, isDeleted: false },
      relations: {
        company: { socialMedia: true, resources: true, info: true },
        companyProfile: true,
        representation: true,
      },
    });

    if (!user) throw new ApiError(404, 'Invalid id. User not found.');

    return user;
  }

  async saveRepresentation(userId: number, representation: string) {
    await this.userRepresentationEntityRepository.update({ user: { id: userId } }, { title: representation, updatedAt: new Date() });

    return await this.findById(userId);
  }
}
