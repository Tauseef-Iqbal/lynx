import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpCybersecurityAndAddAssociatedTables1727891812363 implements MigrationInterface {
  name = 'UpdateTableCpCybersecurityAndAddAssociatedTables1727891812363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_cybersecurity_standards_compliance_details" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "framework" character varying(255), "certification_status" character varying(255), "compliance_files" text array, "cp_cybersecurity_id" bigint NOT NULL, CONSTRAINT "PK_4f7d5710ebe163c982fbce2ee8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_4f7d5710ebe163c982fbce2ee8" ON "cp_cybersecurity_standards_compliance_details" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_bb788ab4a88d0da5b1992bf330" ON "cp_cybersecurity_standards_compliance_details" ("cp_cybersecurity_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_cybersecurity_encryption_details" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "standard" character varying(255), "provider" character varying(255), "encryption_files" text array, "cp_cybersecurity_id" bigint NOT NULL, CONSTRAINT "PK_a340225bd2d65fcfd11f5f069e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_a340225bd2d65fcfd11f5f069e" ON "cp_cybersecurity_encryption_details" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_90ef1e3deeabe656b3bb8269f0" ON "cp_cybersecurity_encryption_details" ("cp_cybersecurity_id") `);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "cybersecurity_standards_compliant_details"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "encrypt_data_details"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "cybersecurity_standards_compliant_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "encrypt_data_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance_details" ADD CONSTRAINT "FK_bb788ab4a88d0da5b1992bf330b" FOREIGN KEY ("cp_cybersecurity_id") REFERENCES "cp_cybersecurity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_encryption_details" ADD CONSTRAINT "FK_90ef1e3deeabe656b3bb8269f04" FOREIGN KEY ("cp_cybersecurity_id") REFERENCES "cp_cybersecurity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_encryption_details" DROP CONSTRAINT "FK_90ef1e3deeabe656b3bb8269f04"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance_details" DROP CONSTRAINT "FK_bb788ab4a88d0da5b1992bf330b"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "encrypt_data_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "cybersecurity_standards_compliant_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "encrypt_data_details" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "cybersecurity_standards_compliant_details" jsonb`);
    await queryRunner.query(`DROP INDEX "public"."IDX_90ef1e3deeabe656b3bb8269f0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a340225bd2d65fcfd11f5f069e"`);
    await queryRunner.query(`DROP TABLE "cp_cybersecurity_encryption_details"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bb788ab4a88d0da5b1992bf330"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4f7d5710ebe163c982fbce2ee8"`);
    await queryRunner.query(`DROP TABLE "cp_cybersecurity_standards_compliance_details"`);
  }
}
