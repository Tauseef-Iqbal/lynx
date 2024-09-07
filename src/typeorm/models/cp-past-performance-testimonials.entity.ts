import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CpPastPerformanceEntity } from './cp-past-performance.entity';

@Entity({ name: 'past_performance_testimonials' })
export class CpPastPerformanceTestimonialsEntity extends CustomBaseEntity {
  @Index()
  @Column({
    name: 'company_name_providing_testimonial',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  companyNameProvidingTestimonial?: string;

  @Column({
    name: 'testimonial_input',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  testimonialInput?: string;

  @ManyToOne(() => CpPastPerformanceEntity, (pp) => pp.pastPerformanceTestimonials, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_past_performanceEntity_id' })
  @Index()
  cpPastPerformanceId: CpPastPerformanceEntity;
}
