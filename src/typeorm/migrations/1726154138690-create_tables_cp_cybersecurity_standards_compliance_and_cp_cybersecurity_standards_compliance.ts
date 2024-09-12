import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCpCybersecurityStandardsComplianceAndCpCybersecurityStandardsCompliance1726154138690 implements MigrationInterface {
  name = 'CreateTablesCpCybersecurityStandardsComplianceAndCpCybersecurityStandardsCompliance1726154138690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_cybersecurity_standards_compliance" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "framework" character varying(255), "certification_status" character varying(255), "compliance_files" text array, "cp_cybersecurity_id" bigint NOT NULL, CONSTRAINT "REL_a41b5b679fab30b615a6afd413" UNIQUE ("cp_cybersecurity_id"), CONSTRAINT "PK_facf3b27e18f10e0c66b4a9fd47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_facf3b27e18f10e0c66b4a9fd4" ON "cp_cybersecurity_standards_compliance" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_a41b5b679fab30b615a6afd413" ON "cp_cybersecurity_standards_compliance" ("cp_cybersecurity_id") `);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "cybersecurity_standards_compliant_details"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "encrypt_data_details"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "cybersecurity_standards_compliant_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" DROP COLUMN "encrypt_data_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "framework"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "certification_status"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "compliance_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "framework" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "certification_status" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "compliance_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "standard" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "provider" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "encryption_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "security_clearances_held_by_employees"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "security_clearances_held_by_employees" text`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "foci_designation_files"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "foci_designation_files" text`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD CONSTRAINT "FK_a41b5b679fab30b615a6afd4139" FOREIGN KEY ("cp_cybersecurity_id") REFERENCES "cp_cybersecurity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP CONSTRAINT "FK_a41b5b679fab30b615a6afd4139"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "foci_designation_files"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "foci_designation_files" jsonb array`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" DROP COLUMN "security_clearances_held_by_employees"`);
    await queryRunner.query(`ALTER TABLE "cp_personnel" ADD "security_clearances_held_by_employees" jsonb array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "encryption_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "provider"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "standard"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "compliance_files"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "certification_status"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" DROP COLUMN "framework"`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "compliance_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "certification_status" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity_standards_compliance" ADD "framework" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "encrypt_data_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "cybersecurity_standards_compliant_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "encrypt_data_details" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_cybersecurity" ADD "cybersecurity_standards_compliant_details" jsonb`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a41b5b679fab30b615a6afd413"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_facf3b27e18f10e0c66b4a9fd4"`);
    await queryRunner.query(`DROP TABLE "cp_cybersecurity_standards_compliance"`);
  }
}
