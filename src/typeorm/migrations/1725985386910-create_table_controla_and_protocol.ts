import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableControlaAndProtocol1725985386910 implements MigrationInterface {
  name = 'CreateTableControlaAndProtocol1725985386910';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "controls_and_protocols" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "perform_audits" boolean NOT NULL DEFAULT false, "audit_details" text, "train_employees" boolean NOT NULL DEFAULT false, "training_details" text, "access_control_measures" boolean NOT NULL DEFAULT false, "access_control_details" text, "fisma_compliance" boolean NOT NULL DEFAULT false, "fisma_compliance_details" text, "review_management_policies" boolean NOT NULL DEFAULT false, "management_policies_details" text, "removable_media_control" boolean NOT NULL DEFAULT false, "removable_media_details" text, "prohibit_unidentified_storage" boolean NOT NULL DEFAULT false, "unidentified_storage_details" text, "nist_compliance" boolean NOT NULL DEFAULT false, "nist_compliance_details" text, "deleted_at" TIMESTAMP WITH TIME ZONE, "cp_id" bigint NOT NULL, CONSTRAINT "REL_cfe821027bb2f99be6439454f0" UNIQUE ("cp_id"), CONSTRAINT "PK_e32ddf8fb47fb30c61b9771d25e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_e32ddf8fb47fb30c61b9771d25" ON "controls_and_protocols" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_cfe821027bb2f99be6439454f0" ON "controls_and_protocols" ("cp_id") `);

    await queryRunner.query(`ALTER TABLE "controls_and_protocols" ADD CONSTRAINT "FK_cfe821027bb2f99be6439454f0c" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "controls_and_protocols" DROP CONSTRAINT "FK_cfe821027bb2f99be6439454f0c"`);
    await queryRunner.query(`DROP TABLE "controls_and_protocols"`);
  }
}
