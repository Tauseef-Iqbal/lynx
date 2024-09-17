import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CpAwardEntity } from './cp-awards.entity';

@Entity('cp_awards_official_docs')
export class CpAwardsOfficalDocsEntity extends CustomBaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name?: string;

  @Column({
    name: 'urls',
    type: 'text',
    array: true,
    nullable: true,
  })
  urls?: string[];

  @ManyToOne(() => CpAwardEntity, (cpAward) => cpAward.officialDocs, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cp_award_id' })
  cpAward: CpAwardEntity;
}
