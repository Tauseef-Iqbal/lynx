import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_certifications' })
export class CpCertificationsEntity extends CustomBaseEntity {
  @Column({ name: 'category', type: 'varchar', length: 255, nullable: true })
  category: string;

  @Column({ name: 'certification_name', type: 'varchar', length: 255, nullable: true })
  certificationName: string;

  @Column({ name: 'status', type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ name: 'completion_date', type: 'date', nullable: true })
  completionDate: Date;

  @Column({ name: 'expected_completion_date', type: 'date', nullable: true })
  expectedCompletionDate: Date;

  @Column({ name: 'estimated_completion_date', type: 'date', nullable: true })
  estimatedCompletionDate: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @Index()
  @ManyToOne(() => CompanyProfileEntity, (company) => company.cpCertifications, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @Column({
    name: 'meta_data',
    type: 'text',
    default: null,
    transformer: {
      to(value) {
        if (value)
          try {
            return JSON.stringify(value);
          } catch (error) {
            return value;
          }
      },
      from(value) {
        if (value)
          try {
            return JSON.parse(value);
          } catch (error) {
            return value;
          }
      },
    },
  })
  metadata: JSON | string;
}
