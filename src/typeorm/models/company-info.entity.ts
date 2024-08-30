import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('company_info')
export class ComapnyInfoEntity extends CustomBaseEntity {
  @Column({
    name: 'company_name',
    type: 'varchar',
    length: 258,
    nullable: true,
  })
  companyName?: string;

  @Column({ name: 'brl', type: 'varchar', length: 255, nullable: true })
  brl?: string;

  @Column({ name: 'cage_code', type: 'varchar', length: 10, nullable: true })
  cageCode?: string;

  @Column({ name: 'products', type: 'json', nullable: true })
  products?: string;

  @Column({ name: 'uei', type: 'varchar', length: 12, nullable: true })
  uei?: string;

  @Column({ name: 'website', type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ name: 'mission_statement', type: 'varchar', nullable: true })
  missionStatement?: string;

  @Column('json', { name: 'phone_numbers', nullable: true })
  phoneNumbers?: string[];

  @Column('json', { name: 'fax_numbers', nullable: true })
  faxNumbers?: string[];

  @Column('json', { name: 'social_links', nullable: true })
  socialLinks?: string[];

  @Column('json', { name: 'certifications', nullable: true })
  certifications?: string[];

  @Column('json', { name: 'awarding_agencies', nullable: true })
  awardingAgencies?: string[];

  @Column('json', { name: 'awarding_sub_agencies', nullable: true })
  awardingSubAgencies?: string[];

  @Column('json', { name: 'points_of_contact', nullable: true })
  pointsOfContact?: string[];

  @Column('json', { name: 'product_service_codes', nullable: true })
  productServiceCodes?: string[];

  @Column('json', { name: 'business_descriptors', nullable: true })
  businessDescriptors?: string[];

  @Column({ name: 'num_prime_contracts', type: 'int', nullable: true })
  numPrimeContracts?: number;

  @Column({ name: 'num_of_employees', type: 'int', nullable: true })
  numOfEmployees?: number;

  @Column({ name: 'num_sub_contracts', type: 'int', nullable: true })
  numSubContracts?: number;

  @Column({ name: 'num_grants', type: 'int', nullable: true })
  numGrants?: number;

  @Column({ name: 'total_awarded_amount', type: 'numeric', nullable: true })
  totalAwardedAmount?: number;

  @Column('json', { name: 'naics' })
  naics?: number[];

  @Column('json', { name: 'addresses' })
  addresses?: string[];

  @Column('json', { name: 'capabilities', nullable: true })
  capabilities?: string[];

  @Column({ name: 'sam_status', type: 'boolean', default: false })
  samStatus?: boolean;

  @Column({ name: 'logo', type: 'varchar', length: 255, nullable: true })
  logo?: string;

  @OneToOne(() => CompanyEntity, (company) => company.info, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'company_id' })
  @Index()
  company?: CompanyEntity;
}
