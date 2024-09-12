import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesPastPerformanceColumneType1726156561449 implements MigrationInterface {
  name = 'AlterTablesPastPerformanceColumneType1726156561449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "past_performance" DROP COLUMN "subcontractors_partners"`);
    await queryRunner.query(`ALTER TABLE "past_performance" ADD "subcontractors_partners" character varying array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "past_performance" DROP COLUMN "subcontractors_partners"`);
    await queryRunner.query(`ALTER TABLE "past_performance" ADD "subcontractors_partners" character varying`);
  }
}
