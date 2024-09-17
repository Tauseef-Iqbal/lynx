import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPpTestimonialsColType1726328628534 implements MigrationInterface {
  name = 'AlterPpTestimonialsColType1726328628534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "past_performance_testimonials" DROP COLUMN "testimonial_input"`);
    await queryRunner.query(`ALTER TABLE "past_performance_testimonials" ADD "testimonial_input" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "past_performance_testimonials" DROP COLUMN "testimonial_input"`);
    await queryRunner.query(`ALTER TABLE "past_performance_testimonials" ADD "testimonial_input" character varying(255)`);
  }
}
