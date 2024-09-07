import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableFundingSourcesAndAddTableFundingSourcesForeignAffiliation1725320001638 implements MigrationInterface {
  name = 'UpdateTableFundingSourcesAndAddTableFundingSourcesForeignAffiliation1725320001638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_funding_sources_foreign_affiliation" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255), "country" character varying(255), "investment_nature" text, "foreign_funding_id" bigint NOT NULL, CONSTRAINT "PK_2ec062304358291fa35e0d8f5f8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_2ec062304358291fa35e0d8f5f" ON "cp_funding_sources_foreign_affiliation" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_bab99ac9948dd41fca34fe639e" ON "cp_funding_sources_foreign_affiliation" ("foreign_funding_id") `);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_funding_details"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_affiliation"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_affiliation" character varying`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" ADD CONSTRAINT "FK_bab99ac9948dd41fca34fe639ef" FOREIGN KEY ("foreign_funding_id") REFERENCES "cp_funding_sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources_foreign_affiliation" DROP CONSTRAINT "FK_bab99ac9948dd41fca34fe639ef"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_affiliation"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_affiliation" text`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_funding_details" jsonb`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bab99ac9948dd41fca34fe639e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2ec062304358291fa35e0d8f5f"`);
    await queryRunner.query(`DROP TABLE "cp_funding_sources_foreign_affiliation"`);
  }
}
