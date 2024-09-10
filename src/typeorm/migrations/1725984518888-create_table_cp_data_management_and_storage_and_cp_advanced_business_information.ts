import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCpDataManagementAndStorageAndCpAdvancedBusinessInformation1725984518888 implements MigrationInterface {
  name = 'CreateTableCpDataManagementAndStorageAndCpAdvancedBusinessInformation1725984518888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" DROP CONSTRAINT "FK_bab99ac9948dd41fca34fe639ef"`);
    await queryRunner.query(`ALTER TABLE "cp_data_compliance_documentation" DROP CONSTRAINT "FK_2ff24a186ce5d7910fa96d7fd59"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bab99ac9948dd41fca34fe639e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5d983293adfb4b04012866e323"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2ff24a186ce5d7910fa96d7fd5"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" RENAME COLUMN "foreign_funding_id" TO "funding_sources_id"`);
    await queryRunner.query(
      `CREATE TABLE "cp_data_management_and_storage" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "cloud_services" boolean, "cloud_services_details" text, "encrypt_govt_data" boolean, "encrypt_govt_data_details" text, "third_party_vendors" boolean, "third_party_vendors_details" text, "tools_for_securing_govt_data" boolean, "tools_for_securing_govt_data_details" text, "documented_govt_data" boolean, "documented_govt_data_details" text, "US_citizens_sensitive_data" jsonb, "US_citizens_sensitive_data_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_92e6314672f5bc844a8cab7042" UNIQUE ("cp_id"), CONSTRAINT "PK_49e37b0323aa9c258ef2a5d94e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_49e37b0323aa9c258ef2a5d94e" ON "cp_data_management_and_storage" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_92e6314672f5bc844a8cab7042" ON "cp_data_management_and_storage" ("cp_id") `);
    await queryRunner.query(`CREATE TYPE "public"."cp_advanced_business_information_dcsaclearancestatus_enum" AS ENUM('Yes', 'No', 'Hold')`);
    await queryRunner.query(`CREATE TYPE "public"."cp_advanced_business_information_sf_certificate_status_enum" AS ENUM('Yes', 'No', 'In-progress')`);
    await queryRunner.query(
      `CREATE TABLE "cp_advanced_business_information" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "company_licensing" boolean, "industry_specific_files" text array, "business_elements" boolean, "business_elements_details" text, "dcsaClearanceStatus" "public"."cp_advanced_business_information_dcsaclearancestatus_enum" NOT NULL DEFAULT 'Hold', "business_plan_files" text array, "capacity_information" jsonb, "foreign_ownership_control" boolean, "foreign_ownership_control_details" text, "invested_by_gov" boolean, "invested_by_gov_details" text, "participate_in_foreign_travel" boolean, "participate_in_foreign_travel_details" text, "participate_in_trade_shows" boolean, "participate_in_trade_shows_details" text, "sf_certificate_status" "public"."cp_advanced_business_information_sf_certificate_status_enum" NOT NULL, "sf_certificate_files" text array, "regularity_action" boolean, "regularity_action_details" text, "convicted_of_felonies" boolean, "convicted_of_felonies_files" text array, "orders_under_dpas" boolean, "orders_under_dpas_details" text, "orders_under_dpas_files" text array, "has_classified_govt_contract" boolean, "has_classified_govt_contract_details" text, "has_ip_transfer" boolean, "has_ip_transfer_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_7a260725991e4183afc1cfde39" UNIQUE ("cp_id"), CONSTRAINT "PK_ca1a8d5673a0ae4643be14fcf70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_ca1a8d5673a0ae4643be14fcf7" ON "cp_advanced_business_information" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_7a260725991e4183afc1cfde39" ON "cp_advanced_business_information" ("cp_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_96b40a8269dc1c26640f39d8d7" ON "cp_funding_sources_foreign_affiliation" ("funding_sources_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_04aa929e6fdf9e53d1613fb26d" ON "cp_data_compliance_documentation" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_fd753c6a7ec3c4846941d3e597" ON "cp_data_compliance_documentation" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" ADD CONSTRAINT "FK_96b40a8269dc1c26640f39d8d7e" FOREIGN KEY ("funding_sources_id") REFERENCES "cp_funding_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_data_management_and_storage" ADD CONSTRAINT "FK_92e6314672f5bc844a8cab7042f" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_advanced_business_information" ADD CONSTRAINT "FK_7a260725991e4183afc1cfde39a" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_data_compliance_documentation" ADD CONSTRAINT "FK_fd753c6a7ec3c4846941d3e597c" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_data_compliance_documentation" DROP CONSTRAINT "FK_fd753c6a7ec3c4846941d3e597c"`);
    await queryRunner.query(`ALTER TABLE "cp_advanced_business_information" DROP CONSTRAINT "FK_7a260725991e4183afc1cfde39a"`);
    await queryRunner.query(`ALTER TABLE "cp_data_management_and_storage" DROP CONSTRAINT "FK_92e6314672f5bc844a8cab7042f"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" DROP CONSTRAINT "FK_96b40a8269dc1c26640f39d8d7e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fd753c6a7ec3c4846941d3e597"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_04aa929e6fdf9e53d1613fb26d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_96b40a8269dc1c26640f39d8d7"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7a260725991e4183afc1cfde39"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ca1a8d5673a0ae4643be14fcf7"`);
    await queryRunner.query(`DROP TABLE "cp_advanced_business_information"`);
    await queryRunner.query(`DROP TYPE "public"."cp_advanced_business_information_sf_certificate_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cp_advanced_business_information_dcsaclearancestatus_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_92e6314672f5bc844a8cab7042"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_49e37b0323aa9c258ef2a5d94e"`);
    await queryRunner.query(`DROP TABLE "cp_data_management_and_storage"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" RENAME COLUMN "funding_sources_id" TO "foreign_funding_id"`);
    await queryRunner.query(`CREATE INDEX "IDX_2ff24a186ce5d7910fa96d7fd5" ON "cp_data_compliance_documentation" ("cp_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5d983293adfb4b04012866e323" ON "cp_data_compliance_documentation" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_bab99ac9948dd41fca34fe639e" ON "cp_funding_sources_foreign_affiliation" ("foreign_funding_id") `);
    await queryRunner.query(`ALTER TABLE "cp_data_compliance_documentation" ADD CONSTRAINT "FK_2ff24a186ce5d7910fa96d7fd59" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" ADD CONSTRAINT "FK_bab99ac9948dd41fca34fe639ef" FOREIGN KEY ("foreign_funding_id") REFERENCES "cp_funding_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
