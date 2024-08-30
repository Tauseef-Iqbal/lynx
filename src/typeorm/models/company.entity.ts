import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { companySource } from 'src/shared/utils/enums';
import { UserEntity } from './user.entity';
import { SocialMediaEntity } from './social-media.entity';
import { ComapnyInfoEntity } from './company-info.entity';
import { CompanyResourceEntity } from './company-resource.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends CustomBaseEntity {
  @Index()
  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  website: string;

  @Index()
  @Column({ nullable: true, type: 'varchar', length: 255, name: 'sam_id' })
  samId: string;

  @Index()
  @Column({ nullable: true, type: 'varchar', length: 255, name: 'cage_code' })
  cageCode: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    name: 'state_of_registration',
  })
  stateOfRegistration: string;

  @Index()
  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    name: 'registration_code',
  })
  registrationCode: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  address: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  state: string;

  @Column({ nullable: true, type: 'bigint', name: 'zip_code' })
  zipCode: number;

  @Column({ nullable: true, type: 'enum', enum: companySource })
  source: string;

  @Column({ name: 'info_ready', type: 'bool', default: false })
  infoReady: boolean;

  @Column({ type: 'varchar', nullable: true })
  overview: string;

  @Column({ type: 'varchar', name: 'mission_statement', nullable: true })
  missionStatement: string;

  @Index()
  @OneToOne(() => UserEntity, (user) => user.company, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => SocialMediaEntity, (socialMedia) => socialMedia.company)
  socialMedia: SocialMediaEntity;

  @OneToOne(() => ComapnyInfoEntity, (info) => info.company)
  info: ComapnyInfoEntity;

  @OneToMany(() => CompanyResourceEntity, (socialMedia) => socialMedia.company)
  resources: CompanyResourceEntity[];
}
