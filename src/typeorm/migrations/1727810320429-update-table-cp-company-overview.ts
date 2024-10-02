import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableCpCompanyOverview1727810320429 implements MigrationInterface {
  name = 'UpdateTableCpCompanyOverview1727810320429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_company_overview" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "snapshot" character varying, "differentiators" text, "competencies" text, "capabilities" text, "values" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_3426dd7caa5f563b248ea554d3" UNIQUE ("cp_id"), CONSTRAINT "PK_25edcfb78c5e756504cfe63e667" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_25edcfb78c5e756504cfe63e66" ON "cp_company_overview" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_3426dd7caa5f563b248ea554d3" ON "cp_company_overview" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_company_overview" ADD CONSTRAINT "FK_3426dd7caa5f563b248ea554d31" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_company_overview" DROP CONSTRAINT "FK_3426dd7caa5f563b248ea554d31"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3426dd7caa5f563b248ea554d3"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_25edcfb78c5e756504cfe63e66"`);
    await queryRunner.query(`DROP TABLE "cp_company_overview"`);
  }
}
