import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity, UpdateDateColumn, type ValueTransformer } from 'typeorm';

export const BooleanTransformer: ValueTransformer = {
  to: (entityValue) => (entityValue === true ? 1 : 0),
  from: (databaseValue) => databaseValue === 1,
};

export const StringToDateTransformer: ValueTransformer = {
  to: (entityValue) => entityValue,
  from: (databaseValue) => databaseValue,
};

export class BaseEntity extends TypeOrmBaseEntity {
  @Index()
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;
}
