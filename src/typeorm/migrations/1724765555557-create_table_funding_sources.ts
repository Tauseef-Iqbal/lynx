import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFundingSources1724765555557 implements MigrationInterface {
  name = 'CreateTableFundingSources1724765555557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_funding_sources" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "funding_type" text, "funding_details" jsonb, "underwriters" text, "raise_equity" boolean, "equity_stages" jsonb, "awardee_has_venture_capital" boolean, "foreign_affiliation" text, "investor_details" jsonb, "foreign_funding" boolean, "foreign_funding_details" jsonb, "government_backed_funding" boolean, "government_backed_funding_details" text, "funding_restrictions" boolean, "funding_restrictions_details" text, "additional_funding_strategy" boolean, "additional_funding_strategy_details" text, "outstanding_debts" boolean, "outstanding_debts_details" text, "funding_instruments" boolean, "funding_instruments_details" text, "has_financial_audits" boolean, "audit_details" text, "strategic_partnership" boolean, "strategic_partnership_details" text, "foreign_financial_interest" boolean, "foreign_financial_interest_details" text, "contingency_financing_plan" boolean, "contingency_financing_plan_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_9ad12e4edd73cc2424856c85a1" UNIQUE ("cp_id"), CONSTRAINT "PK_b434cd41aa0a3595a007def7b38" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_b434cd41aa0a3595a007def7b3" ON "cp_funding_sources" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_9ad12e4edd73cc2424856c85a1" ON "cp_funding_sources" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD CONSTRAINT "FK_9ad12e4edd73cc2424856c85a1c" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP CONSTRAINT "FK_9ad12e4edd73cc2424856c85a1c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9ad12e4edd73cc2424856c85a1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b434cd41aa0a3595a007def7b3"`);
    await queryRunner.query(`DROP TABLE "cp_funding_sources"`);
  }
}
