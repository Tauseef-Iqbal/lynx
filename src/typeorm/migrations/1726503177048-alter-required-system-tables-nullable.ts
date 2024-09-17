import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequiredSystemTablesNullable1726503177048 implements MigrationInterface {
  name = 'AlterRequiredSystemTablesNullable1726503177048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_system_certification" ALTER COLUMN "certification_name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "required_system_types" ALTER COLUMN "system_name" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_system_types" ALTER COLUMN "system_name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "required_system_certification" ALTER COLUMN "certification_name" SET NOT NULL`);
  }
}
