import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequiredSystemTables1726502840251 implements MigrationInterface {
  name = 'AlterRequiredSystemTables1726502840251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_system_certification" ADD "certification_status" character varying NOT NULL DEFAULT 'N/A'`);
    await queryRunner.query(`ALTER TABLE "required_system_types" ADD "system_status" character varying NOT NULL DEFAULT 'N/A'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_system_types" DROP COLUMN "system_status"`);
    await queryRunner.query(`ALTER TABLE "required_system_certification" DROP COLUMN "certification_status"`);
  }
}
