import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';
import { CpAwardsOfficalDocsEntity } from './cp-awards-official-docs.entity';

@Entity({ name: 'cp_awards' })
export class CpAwardEntity extends CustomBaseEntity {
  @Index()
  @Column({
    name: 'name_of_award',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  nameOfAward: string;

  @Column({
    name: 'awarding_organization',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  awardingOrganization: string;

  @Column({ name: 'date_of_award', type: 'date', nullable: true })
  dateOfAward: Date;

  @Column({ name: 'award_description', type: 'text', nullable: true })
  awardDescription: string;

  @OneToMany(() => CpAwardsOfficalDocsEntity, (docs) => docs.cpAward)
  officialDocs?: CpAwardsOfficalDocsEntity[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @Index()
  @ManyToOne(() => CompanyProfileEntity, (company) => company.cpAwards, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
