import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCompanyProfileAndCpFinancialHealthAndToolsApplications1724426875767 implements MigrationInterface {
  name = 'CreateTablesCompanyProfileAndCpFinancialHealthAndToolsApplications1724426875767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_financial_health" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "financial_statements" boolean, "financial_statements_files" text array, "financial_elements" boolean, "financial_elements_details" text, "business_plans" boolean, "business_plans_files" text array, "bankruptcy_filed" boolean, "bankruptcy_filed_details" text, "financial_obligations" boolean, "financial_obligations_details" text, "good_standing_certificates" boolean, "good_standing_certificates_files" text array, "pending_lawsuit_defendant" boolean, "pending_lawsuit_defendant_details" text, "foreign_person_obligations" boolean, "foreign_person_obligations_details" text, "financial_disclosure_statements" boolean, "financial_disclosure_statements_files" text array, "financial_changes" boolean, "financial_changes_details" text, "contingency_financing_plans" boolean, "contingency_financing_plans_details" text, "financial_convenants" boolean, "financial_convenants_details" text, "reserve_fundings" boolean, "reserve_fundings_details" text, "financial_audits" boolean, "financial_audits_files" text array, "ownership_management_financial_changes" boolean, "ownership_management_financial_changes_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_eb2c2a8a1c99ee220308305ab4" UNIQUE ("cp_id"), CONSTRAINT "PK_0c69f464202a48dbb7e1e318297" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_0c69f464202a48dbb7e1e31829" ON "cp_financial_health" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_eb2c2a8a1c99ee220308305ab4" ON "cp_financial_health" ("cp_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_tools_applications" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "operating_systems" jsonb, "tools_and_applications" text, "critical_applications" text, "email_service_provider" boolean, "email_service_provider_details" text, "cloud_services" boolean, "cloud_services_details" text, "on_premise_software_hardware_systems" boolean, "on_premise_software_hardware_systems_details" text, "non_company_owned_mobile_devices" boolean, "mdm_solution" text, "technology_assets" boolean, "technology_assets_details" text, "financial_covenants" boolean, "financial_covenants_details" text, "security_measures" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_7a068b6327968a10bbac7770eb" UNIQUE ("cp_id"), CONSTRAINT "PK_d265cad77d6ad2e95795b0c0d56" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_d265cad77d6ad2e95795b0c0d5" ON "cp_tools_applications" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_7a068b6327968a10bbac7770eb" ON "cp_tools_applications" ("cp_id") `);
    await queryRunner.query(
      `CREATE TABLE "company_profile" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255) NOT NULL, "website" character varying(255), "sam_id" character varying(255) NOT NULL, "cage_code" character varying(255) NOT NULL, "duns" character varying(255) NOT NULL, "ein" character varying(255) NOT NULL, "founder_name" character varying(255) NOT NULL, "founded_year" integer NOT NULL, "state_of_registration" character varying(255) NOT NULL, "registration_code" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "zip_code" bigint NOT NULL, "classification" bigint, "classification_types" jsonb, "industry_associations" jsonb, "assets" jsonb, "social_media" jsonb, "up_id" bigint NOT NULL, CONSTRAINT "REL_d87c1e3b8dd5de6c8d6d6af7a1" UNIQUE ("up_id"), CONSTRAINT "PK_058d1cfee40e5e53412ed7484b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_058d1cfee40e5e53412ed7484b" ON "company_profile" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_1d289c92462b7664c7d2bb380f" ON "company_profile" ("name") `);
    await queryRunner.query(`CREATE INDEX "IDX_96f8fbb3d05aff44639766b1a8" ON "company_profile" ("sam_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_66497631b45132864f824c9501" ON "company_profile" ("cage_code") `);
    await queryRunner.query(`CREATE INDEX "IDX_d87c1e3b8dd5de6c8d6d6af7a1" ON "company_profile" ("up_id") `);
    await queryRunner.query(`ALTER TABLE "cp_financial_health" ADD CONSTRAINT "FK_eb2c2a8a1c99ee220308305ab42" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_tools_applications" ADD CONSTRAINT "FK_7a068b6327968a10bbac7770eb1" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "company_profile" ADD CONSTRAINT "FK_d87c1e3b8dd5de6c8d6d6af7a1f" FOREIGN KEY ("up_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_profile" DROP CONSTRAINT "FK_d87c1e3b8dd5de6c8d6d6af7a1f"`);
    await queryRunner.query(`ALTER TABLE "cp_tools_applications" DROP CONSTRAINT "FK_7a068b6327968a10bbac7770eb1"`);
    await queryRunner.query(`ALTER TABLE "cp_financial_health" DROP CONSTRAINT "FK_eb2c2a8a1c99ee220308305ab42"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d87c1e3b8dd5de6c8d6d6af7a1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_66497631b45132864f824c9501"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_96f8fbb3d05aff44639766b1a8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1d289c92462b7664c7d2bb380f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_058d1cfee40e5e53412ed7484b"`);
    await queryRunner.query(`DROP TABLE "company_profile"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7a068b6327968a10bbac7770eb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d265cad77d6ad2e95795b0c0d5"`);
    await queryRunner.query(`DROP TABLE "cp_tools_applications"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_eb2c2a8a1c99ee220308305ab4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0c69f464202a48dbb7e1e31829"`);
    await queryRunner.query(`DROP TABLE "cp_financial_health"`);
  }
}
