import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpFciAndCui1726849406588 implements MigrationInterface {
  name = 'UpdateTableCpFciAndCui1726849406588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_fci_and_cui" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "protection_contracts" boolean, "protection_contracts_details" text, "assets" boolean, "assets_details" text, "personnel" boolean, "personnel_details" text, "physical_presence" boolean, "physical_presence_details" text, "cui_control_flow" boolean, "cui_control_flow_details" text, "cui_on_public_systems" boolean, "cui_on_public_systems_details" text, "security_notices" boolean, "security_notices_devices" text, "encrypted_cui_on_mobile_devices" boolean, "encrypted_cui_on_mobile_devices_details" text, "sanitize_system_media" boolean, "sanitize_system_media_details" text, "sanitized_offsite_maintenance" boolean, "sanitized_offsite_maintenance_details" text, "paper_and_digital_protection" boolean, "paper_and_digital_protection_details" text, "authorised_users_limited_access" boolean, "authorised_users_limited_access_details" text, "marked_media_with_distribution_limitations" boolean, "marked_media_with_distribution_limitations_details" text, "transport_control_access" boolean, "transport_control_access_details" text, "cryptographic_mechanisms" boolean, "cryptographic_mechanisms_details" text, "storage_locations_protection" boolean, "storage_locations_protection_details" text, "screening_for_autorised_access" boolean, "screening_for_autorised_access_details" text, "pesonnel_actions_consequences" boolean, "pesonnel_actions_consequences_details" text, "work_sites_SOPs" boolean, "work_sites_SOPs_details" text, "org_operations_risk_assessment" boolean, "org_operations_risk_assessment_details" text, "cryptography_for_confidentiality" boolean, "cryptography_for_confidentiality_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_df1b284f07a8947152232a8374" UNIQUE ("cp_id"), CONSTRAINT "PK_a9466357d77cd6bad6be36cafa4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_a9466357d77cd6bad6be36cafa" ON "cp_fci_and_cui" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_df1b284f07a8947152232a8374" ON "cp_fci_and_cui" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_fci_and_cui" ADD CONSTRAINT "FK_df1b284f07a8947152232a83745" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_fci_and_cui" DROP CONSTRAINT "FK_df1b284f07a8947152232a83745"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_df1b284f07a8947152232a8374"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a9466357d77cd6bad6be36cafa"`);
    await queryRunner.query(`DROP TABLE "cp_fci_and_cui"`);
  }
}
