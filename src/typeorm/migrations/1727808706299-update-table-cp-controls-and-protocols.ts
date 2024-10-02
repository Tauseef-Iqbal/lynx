import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpControlsAndProtocols1727808706299 implements MigrationInterface {
  name = 'UpdateTableCpControlsAndProtocols1727808706299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_controls_and_protocols" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "perform_audits" boolean, "audit_details" text, "employee_training" boolean, "employee_training_details" text, "access_control_measures" boolean, "access_control_measures_details" text, "fisma_compliance" boolean, "fisma_compliance_details" text, "review_management_policies" boolean, "review_management_policies_details" text, "removable_media_control" boolean, "removable_media_control_details" text, "prohibit_unidentified_storage" boolean, "prohibit_unidentified_storage_details" text, "nist_compliance" boolean, "nist_compliance_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_135c41663d7f26e560789125ba" UNIQUE ("cp_id"), CONSTRAINT "PK_a6de1313f1f565c35eb58a67560" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_a6de1313f1f565c35eb58a6756" ON "cp_controls_and_protocols" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_135c41663d7f26e560789125ba" ON "cp_controls_and_protocols" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_controls_and_protocols" ADD CONSTRAINT "FK_135c41663d7f26e560789125ba8" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_controls_and_protocols" DROP CONSTRAINT "FK_135c41663d7f26e560789125ba8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_135c41663d7f26e560789125ba"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a6de1313f1f565c35eb58a6756"`);
    await queryRunner.query(`DROP TABLE "cp_controls_and_protocols"`);
  }
}
