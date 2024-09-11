import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpFundingSources1726016992108 implements MigrationInterface {
  name = 'UpdateTableCpFundingSources1726016992108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_affiliation"`);
    await queryRunner.query(`CREATE TYPE "public"."cp_funding_sources_foreign_affiliation_enum" AS ENUM('Yes', 'No', 'Unable to determine')`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_affiliation" "public"."cp_funding_sources_foreign_affiliation_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_affiliation"`);
    await queryRunner.query(`DROP TYPE "public"."cp_funding_sources_foreign_affiliation_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_affiliation" character varying(255)`);
  }
}
