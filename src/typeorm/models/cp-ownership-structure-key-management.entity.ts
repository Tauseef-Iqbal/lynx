import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CPOwnershipStructureEntity } from './cp-ownership-structure.entity';
import { CustomBaseEntity } from './custom-base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cp_ownership_structure_key_management' })
export class CPOwnershipStructureKeyManagementEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role?: string;

  @Index()
  @ManyToOne(() => CPOwnershipStructureEntity, (ownershipStructure) => ownershipStructure.ownershipStructureKeyManagement, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @ApiProperty({ type: () => CPOwnershipStructureEntity })
  @JoinColumn({ name: 'ownership_structure_id' })
  ownershipStructure: CPOwnershipStructureEntity;
}
