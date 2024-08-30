import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnClassificationInCompanyProfileTable1724872188045 implements MigrationInterface {
  name = 'UpdateColumnClassificationInCompanyProfileTable1724872188045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_profile" DROP COLUMN "classification"`);
    await queryRunner.query(`CREATE TYPE "public"."company_profile_classification_enum" AS ENUM('Small Business', 'Other than a Small Business')`);
    await queryRunner.query(`ALTER TABLE "company_profile" ADD "classification" "public"."company_profile_classification_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_profile" DROP COLUMN "classification"`);
    await queryRunner.query(`DROP TYPE "public"."company_profile_classification_enum"`);
    await queryRunner.query(`ALTER TABLE "company_profile" ADD "classification" bigint`);
  }
}
