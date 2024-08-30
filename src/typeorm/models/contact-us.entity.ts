import { Column, Entity, Index } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'contact_us' })
export class ContactUsEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 14 })
  phoneNumber: string;

  @Column({ type: 'text' })
  message: string;
}
