import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesRevenueAndRevenueProjectsAwarded1724443387299 implements MigrationInterface {
  name = 'CreateTablesRevenueAndRevenueProjectsAwarded1724443387299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_revenue_projects_awarded" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255), "value" character varying(255), "agency" character varying(255), "duration" character varying(255), "description" text, "cp_revenue_id" bigint NOT NULL, CONSTRAINT "PK_8693ff0ceffb59b04ea3c358363" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_8693ff0ceffb59b04ea3c35836" ON "cp_revenue_projects_awarded" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_2e9bd70c8b91f749367554596d" ON "cp_revenue_projects_awarded" ("cp_revenue_id") `);
    await queryRunner.query(`CREATE TYPE "public"."cp_revenue_generated_revenue_range_enum" AS ENUM('Less than $100,000', '$100,000 - $499,999', '$500,000 - $999,999', '$1 million - $4.99 million', '$5 million - $9.99 million', '$10 million - $49.99 million', '$50 million or more')`);
    await queryRunner.query(`CREATE TYPE "public"."cp_revenue_company_revenue_stream_enum" AS ENUM('Dependent on a few key customers', 'Diversified across multiple customers')`);
    await queryRunner.query(
      `CREATE TABLE "cp_revenue" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "growth_state" jsonb, "generated_revenue" text, "generated_revenue_range" "public"."cp_revenue_generated_revenue_range_enum", "five_percent_foreign_revenue" boolean, "five_percent_foreign_revenue_details" text, "company_revenue_stream" "public"."cp_revenue_company_revenue_stream_enum", "customer_details" jsonb, "irs_tax_filed" boolean, "financial_backing_investments" boolean, "financial_backing_investments_details" text, "revenue_sharing_agreements" boolean, "revenue_sharing_agreements_details" text, "revenue_restrictions" boolean, "revenue_restrictions_details" text, "revenue_growth_plan" boolean, "revenue_growth_plan_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_80b4bed20ee4cad1465f40f783" UNIQUE ("cp_id"), CONSTRAINT "PK_0f399fbd0876c7590fffaeebe88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_0f399fbd0876c7590fffaeebe8" ON "cp_revenue" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_80b4bed20ee4cad1465f40f783" ON "cp_revenue" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_revenue_projects_awarded" ADD CONSTRAINT "FK_2e9bd70c8b91f749367554596df" FOREIGN KEY ("cp_revenue_id") REFERENCES "cp_revenue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_revenue" ADD CONSTRAINT "FK_80b4bed20ee4cad1465f40f7833" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_revenue" DROP CONSTRAINT "FK_80b4bed20ee4cad1465f40f7833"`);
    await queryRunner.query(`ALTER TABLE "cp_revenue_projects_awarded" DROP CONSTRAINT "FK_2e9bd70c8b91f749367554596df"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_80b4bed20ee4cad1465f40f783"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0f399fbd0876c7590fffaeebe8"`);
    await queryRunner.query(`DROP TABLE "cp_revenue"`);
    await queryRunner.query(`DROP TYPE "public"."cp_revenue_company_revenue_stream_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cp_revenue_generated_revenue_range_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2e9bd70c8b91f749367554596d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8693ff0ceffb59b04ea3c35836"`);
    await queryRunner.query(`DROP TABLE "cp_revenue_projects_awarded"`);
  }
}
