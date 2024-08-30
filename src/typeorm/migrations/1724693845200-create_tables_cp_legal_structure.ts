import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCpLegalStructure1724693845200 implements MigrationInterface {
  name = 'CreateTablesCpLegalStructure1724693845200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_legal_structure_org_facilities" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "office_address" character varying(255), "state" character varying(100), "city" character varying(100), "country" character varying(100), "office_type" character varying(50), "company_profile_legal_structure_id" bigint NOT NULL, CONSTRAINT "PK_9ab1e1ea622dd75146c14e7c724" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_9ab1e1ea622dd75146c14e7c72" ON "cp_legal_structure_org_facilities" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5be083128d07cd99d3bb7c2ee2" ON "cp_legal_structure_org_facilities" ("company_profile_legal_structure_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_legal_structure" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "legal_structure" character varying(255), "dba_name" character varying(255), "dba_files" text array, "completed_projects_files" text array, "legal_structure_changed" boolean NOT NULL DEFAULT true, "legal_structure_changed_description" text, "corporation_own_operate_foreign_countries" boolean NOT NULL DEFAULT true, "corporation_own_operate_foreign_countries_description" text, "has_multiple_org_facilities" boolean NOT NULL DEFAULT true, "cp_id" bigint NOT NULL, CONSTRAINT "REL_3dd0b8ee96d61db9891df08b10" UNIQUE ("cp_id"), CONSTRAINT "PK_c4e9b15e5d498a3a7eafb954d5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_c4e9b15e5d498a3a7eafb954d5" ON "cp_legal_structure" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_fc543ad010f7fe8e373da63825" ON "cp_legal_structure" ("legal_structure") `);
    await queryRunner.query(`CREATE INDEX "IDX_3dd0b8ee96d61db9891df08b10" ON "cp_legal_structure" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "company_info" DROP COLUMN "company_name"`);
    await queryRunner.query(`ALTER TABLE "company_info" ADD "company_name" character varying(258)`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" ADD CONSTRAINT "FK_5be083128d07cd99d3bb7c2ee2c" FOREIGN KEY ("company_profile_legal_structure_id") REFERENCES "cp_legal_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD CONSTRAINT "FK_3dd0b8ee96d61db9891df08b10a" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP CONSTRAINT "FK_3dd0b8ee96d61db9891df08b10a"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure_org_facilities" DROP CONSTRAINT "FK_5be083128d07cd99d3bb7c2ee2c"`);
    await queryRunner.query(`ALTER TABLE "company_info" DROP COLUMN "company_name"`);
    await queryRunner.query(`ALTER TABLE "company_info" ADD "company_name" character varying(255) NOT NULL`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3dd0b8ee96d61db9891df08b10"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fc543ad010f7fe8e373da63825"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c4e9b15e5d498a3a7eafb954d5"`);
    await queryRunner.query(`DROP TABLE "cp_legal_structure"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5be083128d07cd99d3bb7c2ee2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9ab1e1ea622dd75146c14e7c72"`);
    await queryRunner.query(`DROP TABLE "cp_legal_structure_org_facilities"`);
  }
}
