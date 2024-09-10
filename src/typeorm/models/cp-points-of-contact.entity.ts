import { POCType } from 'src/modules/points-of-contact/enums';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from '.';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_points_of_contact' })
export class CPPointsOfContactEntity extends CustomBaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', enum: POCType })
  type: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.pointsOfContact, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
