import { Column, JoinColumn, OneToOne, Index, Entity } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'company_social_media' })
export class SocialMediaEntity extends CustomBaseEntity {
  @Column({ nullable: true, type: 'varchar' })
  linkedIn: string;

  @Column({ nullable: true, type: 'varchar' })
  instagram: string;

  @Column({ nullable: true, type: 'varchar' })
  facebook: string;

  @Column({ nullable: true, type: 'varchar' })
  youTube: string;

  @OneToOne(() => CompanyEntity, (company) => company.socialMedia, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'company_id' })
  @Index()
  company: CompanyEntity;
}
