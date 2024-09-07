import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesCpCertifications1725470241814 implements MigrationInterface {
  name = 'AlterTablesCpCertifications1725470241814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_certifications" ADD "estimated_completion_date" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_certifications" DROP COLUMN "estimated_completion_date"`);
  }
}
