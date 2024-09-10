import { Column, Entity, Index, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CompanyEntity } from './company.entity';
import { CustomBaseEntity } from './custom-base.entity';
import { UserRepresentationEntity } from './user-representation.entity';

@Entity({ name: 'user' })
export class UserEntity extends CustomBaseEntity {
  @Index()
  @Column({ nullable: false, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: true, type: 'varchar', select: false, length: 255 })
  password: string;

  @Index()
  @Column({
    name: 'email_verified',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  emailVerified: boolean;

  @Column({ nullable: true, type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ nullable: true, type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    name: 'perferred_name',
  })
  preferredName: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  title: string;

  @Index()
  @Column({ nullable: true, type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => CompanyEntity, (company) => company.user, { nullable: true })
  company: CompanyEntity;

  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.userProfile, { nullable: true })
  companyProfile: CompanyProfileEntity;

  @OneToOne(() => UserRepresentationEntity, (rep) => rep.user, {
    nullable: true,
  })
  representation: UserRepresentationEntity;

  @Index()
  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    name: 'forgot_password_uuid',
  })
  forgotPasswordUuid: string;
}
