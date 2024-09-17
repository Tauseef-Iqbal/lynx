import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpCpPersonnel1726243969033 implements MigrationInterface {
  name = 'UpdateTableCpCpPersonnel1726243969033';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "security_clearances_held_by_employees"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "security_clearances_held_by_employees" text`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "foci_designation_files"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "foci_designation_files" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "foci_designation_files"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "foci_designation_files" jsonb array`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "security_clearances_held_by_employees"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "security_clearances_held_by_employees" jsonb array`);
  }
}
