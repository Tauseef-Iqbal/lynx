import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from '.';
import { CpPastPerformanceTestimonialsEntity } from './cp-past-performance-testimonials.entity';

@Entity({ name: 'past_performance' })
export class CpPastPerformanceEntity extends CustomBaseEntity {
  @Index()
  @Column({
    name: 'contract_name',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  contractName?: string;

  @Column({
    name: 'contracting_agency_name',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  contractingAgencyName?: string;

  @Column({
    name: 'contract_type',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  contractType?: string;

  @Column({
    name: 'contract_number',
    nullable: true,
    type: 'bigint',
  })
  contractNumber?: number;

  @Column({
    name: 'buying_agency_name',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  buyingAgencyName?: string;

  @Column({
    name: 'program_record_supported',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  programRecordSupported?: string;

  @Column({
    name: 'performance_period_start_date',
    nullable: true,
    type: 'date',
  })
  performancePeriodStartDate?: Date;

  @Column({
    name: 'performance_period_end_date',
    nullable: true,
    type: 'date',
  })
  performancePeriodEndDate?: Date;

  @Column({
    name: 'details_of_efforts',
    nullable: true,
    type: 'text',
  })
  detailsOfEfforts?: string;

  @Column({
    name: 'subcontractors_partners',
    nullable: true,
    type: 'varchar',
    array: true,
  })
  subcontractorsPartners?: string[];

  @Column({
    name: 'supporting_docs',
    nullable: true,
    type: 'text',
    array: true,
  })
  supportingDocs?: string[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @OneToMany(() => CpPastPerformanceTestimonialsEntity, (pp) => pp.cpPastPerformanceId)
  pastPerformanceTestimonials: CpPastPerformanceTestimonialsEntity[];

  @Index()
  @ManyToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.pastPerformance, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
