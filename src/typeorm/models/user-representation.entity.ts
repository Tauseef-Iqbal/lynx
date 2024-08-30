import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_representation' })
export class UserRepresentationEntity extends CustomBaseEntity {
  @Index()
  @OneToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  title: string;
}
