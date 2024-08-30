import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCybersecurity1724690581343 implements MigrationInterface {
  name = 'CreateTableCybersecurity1724690581343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_cybersecurity" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "cybersecurity_team" boolean, "cybersecurity_team_details" text, "cybersecurity_policy" boolean, "cybersecurity_policy_details" text, "penetration_testing" boolean, "penetration_testing_details" jsonb, " cybersecurity_standards_compliant" boolean, "cybersecurity_standards_compliant_details" jsonb, " incident_response_plan" boolean, "last_incident" date, "cybersecurity_training" boolean, "cybersecurity_training_details" jsonb, "encrypt_data" boolean, "encrypt_data_details" jsonb, "cybersecurity_audits" boolean, "cybersecurity_audits_details" jsonb, "foreign_entity_involved" boolean, "foreign_entity_involved_details" jsonb, "manage_access_control" boolean, "manage_access_control_details" jsonb, "cyber_violations_reported" boolean, "cyber_violations_reported_24_hrs" boolean, "cyber_violations_resolved" boolean, "cyber_violations_summary" text, "interested_in_ cybersecurity_assessement" boolean, "preferred_assessement_type" text, "primary_follow_up_contact" jsonb, "cp_id" bigint NOT NULL, CONSTRAINT "REL_f767a9392db6a783c0e0037704" UNIQUE ("cp_id"), CONSTRAINT "PK_0283accf01810a48500f8c396fa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_0283accf01810a48500f8c396f" ON "cp_cybersecurity" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_f767a9392db6a783c0e0037704" ON "cp_cybersecurity" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD CONSTRAINT "FK_f767a9392db6a783c0e0037704f" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP CONSTRAINT "FK_f767a9392db6a783c0e0037704f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f767a9392db6a783c0e0037704"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0283accf01810a48500f8c396f"`);
    await queryRunner.query(`DROP TABLE "cp_cybersecurity"`);
  }
}
