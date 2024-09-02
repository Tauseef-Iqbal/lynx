import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCompanyProfileTable1725111231158 implements MigrationInterface {
  name = 'UpdateCompanyProfileTable1725111231158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "sam_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "cage_code" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "duns" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "ein" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "founder_name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "founded_year" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "state_of_registration" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "registration_code" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" DROP COLUMN "zip_code"`);
    await queryRunner.query(`ALTER TABLE "company_profile" ADD "zip_code" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_profile" DROP COLUMN "zip_code"`);
    await queryRunner.query(`ALTER TABLE "company_profile" ADD "zip_code" bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "registration_code" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "state_of_registration" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "founded_year" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "founder_name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "ein" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "duns" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "cage_code" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "sam_id" SET NOT NULL`);
  }
}
