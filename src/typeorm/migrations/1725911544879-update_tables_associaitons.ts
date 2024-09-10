import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesAssociaitons1725911544879 implements MigrationInterface {
  name = 'UpdateTablesAssociaitons1725911544879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" DROP CONSTRAINT "FK_bab99ac9948dd41fca34fe639ef"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bab99ac9948dd41fca34fe639e"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" RENAME COLUMN "foreign_funding_id" TO "funding_sources_id"`);
    await queryRunner.query(
      `CREATE TABLE "cp_supply_chain_supplier" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255), "website" character varying(255), "sam_id" character varying(255), "cage_code" character varying(255), "duns" character varying(255), "address" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "classification" character varying(255), "facility-clearance-type" character varying(255), "operations_criticality" text, "supply_chain_id" bigint NOT NULL, CONSTRAINT "REL_886a048d49c632130f1b808038" UNIQUE ("supply_chain_id"), CONSTRAINT "PK_3d7dd8ea1486bcb13d317fd5df5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_3d7dd8ea1486bcb13d317fd5df" ON "cp_supply_chain_supplier" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_f0d1c540ab101b0e14bfe1bc18" ON "cp_supply_chain_supplier" ("name") `);
    await queryRunner.query(`CREATE INDEX "IDX_83397f8c0e4581ebe4f4da8ee6" ON "cp_supply_chain_supplier" ("sam_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_ad7029a551faa56d0ca091352f" ON "cp_supply_chain_supplier" ("cage_code") `);
    await queryRunner.query(`CREATE INDEX "IDX_886a048d49c632130f1b808038" ON "cp_supply_chain_supplier" ("supply_chain_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_supply_chain" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "supply_chain_entities" boolean, "sole_source_suppliers" text, "contingency_plan" boolean, "contingency_plan_details" text, "import_materials_foreign_sources" boolean, "import_materials_foreign_sources_details" jsonb, "supplier_compliance_process" boolean, "supplier_compliance_process_details" text, "supplier_tracking_origin" boolean, "supplier_tracking_origin_details" text, "counterfeit_detection_mechanism" boolean, "counterfeit_detection_mechanism_details" text, "suppliers_banned_list" boolean, "suppliers_banned_list_files" text array, "oem_licensed_resellers" boolean, "oem_licensed_resellers_details" text, "restricted_country_suppliers" boolean, "restricted_country_suppliers_details" jsonb, "foreign_contractual_obligations" boolean, "foreign_contractual_obligations_details" jsonb, "foreign_interest_10_percent" boolean, "foreign_interest_10_percent_details" text, "supply_chain_cybersecurity_audits" boolean, "supply_chain_cybersecurity_audits_details" text, "supplier_cybersecurity_standard_comply" boolean, "supplier_cybersecurity_standard_comply_details" jsonb, "supplier_cybersecurity_breach" boolean, "supplier_cybersecurity_breach_details" text, "cui_protection_supplier_contract" boolean, "cui_protection_supplier_contract_details" text, "supplier_ethical_practices_contract" boolean, "supplier_ethical_practices_contract_files" text array, "supplier_sustainability_compliance_contract" boolean, "supplier_sustainability_compliance_contract_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_7d174b1b26294101de33fc7d67" UNIQUE ("cp_id"), CONSTRAINT "PK_790d5836b2967cafe21f97cc7d2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_790d5836b2967cafe21f97cc7d" ON "cp_supply_chain" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_7d174b1b26294101de33fc7d67" ON "cp_supply_chain" ("cp_id") `);
    await queryRunner.query(`CREATE TYPE "public"."cp_personnel_total_employees_enum" AS ENUM('Fewer than 10 employees', 'Between 10 and 50 individuals', 'Between 51 and 250 individuals', 'More than 250 individuals', 'More than 1000 individuals')`);
    await queryRunner.query(`CREATE TYPE "public"."cp_personnel_us_military_veterans_employees_enum" AS ENUM('0-10', '11-25', '26-50', '51-75', '76-100', '100+')`);
    await queryRunner.query(
      `CREATE TABLE "cp_personnel" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "total_employees" "public"."cp_personnel_total_employees_enum", "us_citizen_employees_percentage" character varying, "active_security_clearances_employees" character varying, "security_clearances_held_by_employees" jsonb array, "employees_involved_in_govt_contracts" character varying, "employees_background_checks_govt_contract" boolean, "employees_background_checks_govt_contract_details" text, "employees_itar_controlled_projects" boolean, "employees_itar_controlled_projects_details" text, "employees_nispom_compliance" boolean, "employees_nispom_compliance_details" text, "foci_designation" boolean, "foci_designation_details" text, "foci_designation_files" jsonb array, "non_us_employees" boolean, "strategic_competitors_related_foreign_ties" boolean, "strategic_competitors_related_foreign_ties_details" text, "foreign_nationals" boolean, "foreign_nationals_details" text, "company_fso" boolean, "company_fso_details" jsonb, "employees_involved_in_security_breach" boolean, "employees_involved_in_security_breach_details" text, "us_military_veterans_employees" "public"."cp_personnel_us_military_veterans_employees_enum", "diversity_initiatives" boolean, "diversity_initiatives_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_35c6d9be7dd338125132e5bc68" UNIQUE ("cp_id"), CONSTRAINT "PK_9552c0a6b565187ae4a6cc41de6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_9552c0a6b565187ae4a6cc41de" ON "cp_personnel" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_35c6d9be7dd338125132e5bc68" ON "cp_personnel" ("cp_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_points_of_contact" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "type" character varying NOT NULL, "cp_id" bigint NOT NULL, CONSTRAINT "REL_5ee6315f95c252ae7c967d9d5e" UNIQUE ("cp_id"), CONSTRAINT "PK_e465022cd74a757ce6a66f8b323" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_e465022cd74a757ce6a66f8b32" ON "cp_points_of_contact" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_ef2c3cc3b835bc19008e047c80" ON "cp_points_of_contact" ("name") `);
    await queryRunner.query(`CREATE INDEX "IDX_a32248cc11f824434933eeda4e" ON "cp_points_of_contact" ("phone") `);
    await queryRunner.query(`CREATE INDEX "IDX_c8e9cf19dc98b7e27a87909c06" ON "cp_points_of_contact" ("email") `);
    await queryRunner.query(`CREATE INDEX "IDX_5ee6315f95c252ae7c967d9d5e" ON "cp_points_of_contact" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "company_info" DROP COLUMN "company_name"`);
    await queryRunner.query(`ALTER TABLE "company_info" ADD "company_name" character varying(258)`);
    await queryRunner.query(`CREATE INDEX "IDX_96b40a8269dc1c26640f39d8d7" ON "cp_funding_sources_foreign_affiliation" ("funding_sources_id") `);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" ADD CONSTRAINT "FK_96b40a8269dc1c26640f39d8d7e" FOREIGN KEY ("funding_sources_id") REFERENCES "cp_funding_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain_supplier" ADD CONSTRAINT "FK_886a048d49c632130f1b808038a" FOREIGN KEY ("supply_chain_id") REFERENCES "cp_supply_chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" ADD CONSTRAINT "FK_7d174b1b26294101de33fc7d675" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD CONSTRAINT "FK_35c6d9be7dd338125132e5bc680" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" ADD CONSTRAINT "FK_5ee6315f95c252ae7c967d9d5eb" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" DROP CONSTRAINT "FK_5ee6315f95c252ae7c967d9d5eb"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP CONSTRAINT "FK_35c6d9be7dd338125132e5bc680"`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" DROP CONSTRAINT "FK_7d174b1b26294101de33fc7d675"`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain_supplier" DROP CONSTRAINT "FK_886a048d49c632130f1b808038a"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" DROP CONSTRAINT "FK_96b40a8269dc1c26640f39d8d7e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_96b40a8269dc1c26640f39d8d7"`);
    await queryRunner.query(`ALTER TABLE "company_info" DROP COLUMN "company_name"`);
    await queryRunner.query(`ALTER TABLE "company_info" ADD "company_name" character varying(255)`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5ee6315f95c252ae7c967d9d5e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c8e9cf19dc98b7e27a87909c06"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a32248cc11f824434933eeda4e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ef2c3cc3b835bc19008e047c80"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e465022cd74a757ce6a66f8b32"`);
    await queryRunner.query(`DROP TABLE "cp_points_of_contact"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_35c6d9be7dd338125132e5bc68"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9552c0a6b565187ae4a6cc41de"`);
    await queryRunner.query(`DROP TABLE "cp_personnel"`);
    await queryRunner.query(`DROP TYPE "public"."cp_personnel_us_military_veterans_employees_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cp_personnel_total_employees_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7d174b1b26294101de33fc7d67"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_790d5836b2967cafe21f97cc7d"`);
    await queryRunner.query(`DROP TABLE "cp_supply_chain"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_886a048d49c632130f1b808038"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ad7029a551faa56d0ca091352f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_83397f8c0e4581ebe4f4da8ee6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f0d1c540ab101b0e14bfe1bc18"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3d7dd8ea1486bcb13d317fd5df"`);
    await queryRunner.query(`DROP TABLE "cp_supply_chain_supplier"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" RENAME COLUMN "funding_sources_id" TO "foreign_funding_id"`);
    await queryRunner.query(`CREATE INDEX "IDX_bab99ac9948dd41fca34fe639e" ON "cp_funding_sources_foreign_affiliation" ("foreign_funding_id") `);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" ADD CONSTRAINT "FK_bab99ac9948dd41fca34fe639ef" FOREIGN KEY ("foreign_funding_id") REFERENCES "cp_funding_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
