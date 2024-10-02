import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpLegalStructureAndAssociatedTable1727798865001 implements MigrationInterface {
  name = 'UpdateTableCpLegalStructureAndAssociatedTable1727798865001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP CONSTRAINT "FK_5be083128d07cd99d3bb7c2ee2c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5be083128d07cd99d3bb7c2ee2"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "company_profile_legal_structure_id"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "has_multiple_org_facilities"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "dba_files"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "completed_projects_files"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "legal_structure_changed_description"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "corporation_own_operate_foreign_countries_description"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "cp_legal_structure_id" bigint NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "other_legal_structure" character varying`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "dba_assets" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "dba_name_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "legal_structure_changed_details" text`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "corporation_own_operate_foreign_countries_details" text`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "multiple_org_facilities" boolean`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "office_address"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "office_address" character varying`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "state"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "state" character varying`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "city" character varying`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "country" character varying`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "office_type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."cp_legal_structure_org_facilities_office_type_enum" AS ENUM('Headquarters', 'Regional Office', 'Branch Office', 'Sales Office', 'Manufacturing Facility', 'Research and Development (R&D) Center', 'Partnership Agreement (For Partnerships)', 'Other')`,
    );
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "office_type" "public"."cp_legal_structure_org_facilities_office_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fc543ad010f7fe8e373da63825"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "legal_structure"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "legal_structure" text`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "dba_name"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "dba_name" boolean`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ALTER COLUMN "legal_structure_changed" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ALTER COLUMN "legal_structure_changed" DROP DEFAULT`);
    await queryRunner.query(`CREATE INDEX "IDX_c36a3b625f11f960edc5a3d8e5" ON "cp_legal_structure_org_facilities" ("cp_legal_structure_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_fc543ad010f7fe8e373da63825" ON "cp_legal_structure" ("legal_structure") `);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD CONSTRAINT "FK_c36a3b625f11f960edc5a3d8e5d" FOREIGN KEY ("cp_legal_structure_id") REFERENCES "cp_legal_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP CONSTRAINT "FK_c36a3b625f11f960edc5a3d8e5d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fc543ad010f7fe8e373da63825"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c36a3b625f11f960edc5a3d8e5"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ALTER COLUMN "legal_structure_changed" SET DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ALTER COLUMN "legal_structure_changed" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "dba_name"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "dba_name" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "legal_structure"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "legal_structure" character varying(255) array`);
    await queryRunner.query(`CREATE INDEX "IDX_fc543ad010f7fe8e373da63825" ON "cp_legal_structure" ("legal_structure") `);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "office_type"`);
    await queryRunner.query(`DROP TYPE "public"."cp_legal_structure_org_facilities_office_type_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "office_type" character varying(50)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "country" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "city" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "state"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "state" character varying(100)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "office_address"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "office_address" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "multiple_org_facilities"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "corporation_own_operate_foreign_countries_details"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "legal_structure_changed_details"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "dba_name_files"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "dba_assets"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "other_legal_structure"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP COLUMN "cp_legal_structure_id"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "corporation_own_operate_foreign_countries_description" text`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "legal_structure_changed_description" text`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "completed_projects_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "dba_files" text array`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "has_multiple_org_facilities" boolean NOT NULL DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD "company_profile_legal_structure_id" bigint NOT NULL`);
    await queryRunner.query(`CREATE INDEX "IDX_5be083128d07cd99d3bb7c2ee2" ON "cp_legal_structure_org_facilities" ("company_profile_legal_structure_id") `);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD CONSTRAINT "FK_5be083128d07cd99d3bb7c2ee2c" FOREIGN KEY ("company_profile_legal_structure_id") REFERENCES "cp_legal_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
