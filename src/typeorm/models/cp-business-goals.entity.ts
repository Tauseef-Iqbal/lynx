import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from '.';

@Entity('cp_business_goals')
export class CPBusinessGoalsEntity extends CustomBaseEntity {
  @Column({ name: 'growth_and_expansion', type: 'text', array: true, nullable: true })
  growthAndExpansion?: string[];

  @Column({ type: 'text', array: true, nullable: true })
  collaboration?: string[];

  @Column({ type: 'text', array: true, nullable: true })
  procurement?: string[];

  @Column({ type: 'text', array: true, nullable: true })
  operations?: string[];

  @Column({ name: 'branding_and_marketing', type: 'text', array: true, nullable: true })
  brandingAndMarketing?: string[];

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.businessGoals, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
