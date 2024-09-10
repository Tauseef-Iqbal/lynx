import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CPOwnershipStructureEntity } from './cp-ownership-structure.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_ownership_structure_details' })
export class CPOwnershipStructureDetailsEntity extends CustomBaseEntity {
  @Column({ name: 'round_type', type: 'text', nullable: true })
  roundType?: string;

  @Column({ name: 'investor_name', type: 'text', nullable: true })
  investorName?: string;

  @Column({ name: 'country_of_affiliation', type: 'text', nullable: true })
  countryOfAffiliation?: string;

  @Column({ name: 'number_of_shares', type: 'int', nullable: true })
  numberOfShares?: number;

  @Column({ name: 'types_of_shares', type: 'jsonb', nullable: true })
  typesOfShares?: string[] | string;

  @Column({ name: 'capital_invested', type: 'decimal', nullable: true })
  capitalInvested?: number;

  @Column({ name: 'ownership_or_voting_rights', type: 'text', nullable: true })
  ownershipOrVotingRights?: string;

  @Index()
  @OneToOne(() => CPOwnershipStructureEntity, (ownershipStructure) => ownershipStructure.ownershipStructureDetails, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'ownership_structure_id' })
  ownershipStructure: CPOwnershipStructureEntity;
}
