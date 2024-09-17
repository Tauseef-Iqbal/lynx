import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesAwardOfficialDocs1726324657029 implements MigrationInterface {
  name = 'AlterTablesAwardOfficialDocs1726324657029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" DROP COLUMN "url"`);
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" ADD "urls" text array`);
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" ALTER COLUMN "name" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" DROP COLUMN "urls"`);
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" ADD "url" character varying(255) NOT NULL`);
  }
}
