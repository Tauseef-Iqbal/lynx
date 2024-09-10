import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPFundingSourcesEntity } from './cp-funding-sources.entity';

@Entity({ name: 'cp_funding_sources_foreign_affiliation' })
export class CPFundingSourcesForeignAffiliationEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country?: string;

  @Column({ name: 'investment_nature', type: 'text', nullable: true })
  investmentNature?: string;

  @Index()
  @ManyToOne(() => CPFundingSourcesEntity, (fundingSources) => fundingSources.fundingSourcesForeignAffiliation, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'funding_sources_id' })
  fundingSources: CPFundingSourcesEntity;
}
