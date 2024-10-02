import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpRevenueAndProjectsAwarded1726016258162 implements MigrationInterface {
  name = 'UpdateTableCpRevenueAndProjectsAwarded1726016258162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_revenue_projects_awarded" ADD "past_performance" boolean`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" DROP COLUMN "generated_revenue"`);
    await queryRunner.query(`CREATE TYPE "public"."cp_revenue_generated_revenue_enum" AS ENUM('Yes', 'No', 'Not Applicable')`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" ADD "generated_revenue" "public"."cp_revenue_generated_revenue_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."cp_revenue_company_revenue_stream_enum" RENAME TO "cp_revenue_company_revenue_stream_enum_old"`);
    await queryRunner.query(`CREATE TYPE "public"."cp_revenue_company_revenue_stream_enum" AS ENUM('Dependent on a few key customers', 'Diversified across multiple customers', 'Not Applicable')`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" ALTER COLUMN "company_revenue_stream" TYPE "public"."cp_revenue_company_revenue_stream_enum" USING "company_revenue_stream"::"text"::"public"."cp_revenue_company_revenue_stream_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cp_revenue_company_revenue_stream_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."cp_revenue_company_revenue_stream_enum_old" AS ENUM('Dependent on a few key customers', 'Diversified across multiple customers')`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" ALTER COLUMN "company_revenue_stream" TYPE "public"."cp_revenue_company_revenue_stream_enum_old" USING "company_revenue_stream"::"text"::"public"."cp_revenue_company_revenue_stream_enum_old"`);
    await queryRunner.query(`DROP TYPE "public"."cp_revenue_company_revenue_stream_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."cp_revenue_company_revenue_stream_enum_old" RENAME TO "cp_revenue_company_revenue_stream_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" DROP COLUMN "generated_revenue"`);
    await queryRunner.query(`DROP TYPE "public"."cp_revenue_generated_revenue_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" ADD "generated_revenue" text`);
    await queryRunner.query(`ALTER TABLE "cp_revenue_projects_awarded" DROP COLUMN "past_performance"`);
  }
}
