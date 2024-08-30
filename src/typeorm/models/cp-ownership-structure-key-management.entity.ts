import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CPOwnershipStructureEntity } from './cp-ownership-structure.entity';
import { CustomBaseEntity } from './custom-base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cp_ownership_structure_key_management' })
export class CPOwnershipStructureKeyManagementEntity extends CustomBaseEntity {
  @Column({ type: 'text', nullable: false })
  name?: string;

  @Column({ type: 'text', nullable: false })
  role?: string;

  @Index()
  @ManyToOne(() => CPOwnershipStructureEntity, (ownershipStructure) => ownershipStructure.ownershipStructureKeyManagement, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    lazy: true,
  })
  @ApiProperty({ type: () => CPOwnershipStructureEntity })
  @JoinColumn({ name: 'ownership_structure_id' })
  ownershipStructure: Promise<CPOwnershipStructureEntity>;
}
