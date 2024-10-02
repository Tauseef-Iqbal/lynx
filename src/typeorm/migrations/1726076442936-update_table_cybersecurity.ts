import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCybersecurity1726076442936 implements MigrationInterface {
  name = 'UpdateTableCybersecurity1726076442936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "cybersecurity_standards_compliant_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "encrypt_data_files" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "encrypt_data_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "cybersecurity_standards_compliant_files"`);
  }
}
