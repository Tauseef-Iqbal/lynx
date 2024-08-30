import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesOwnershipStructureAndSubTables1724959947770 implements MigrationInterface {
  name = 'CreateTablesOwnershipStructureAndSubTables1724959947770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_ownership_structure_details" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "round_type" text, "investor_name" text, "country_of_affiliation" text, "number_of_shares" integer, "types_of_shares" jsonb, "capital_invested" numeric, "ownership_or_voting_rights" text, "ownership_structure_id" bigint NOT NULL, CONSTRAINT "REL_3ae31b01c1ced0d2b5a31cbaf2" UNIQUE ("ownership_structure_id"), CONSTRAINT "PK_47ad9e79bbafc4a2c711ca449bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_47ad9e79bbafc4a2c711ca449b" ON "cp_ownership_structure_details" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_3ae31b01c1ced0d2b5a31cbaf2" ON "cp_ownership_structure_details" ("ownership_structure_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_ownership_structure_key_management" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" text NOT NULL, "role" text NOT NULL, "ownership_structure_id" bigint NOT NULL, CONSTRAINT "PK_659f40e96ed3da56644d9b766e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_659f40e96ed3da56644d9b766e" ON "cp_ownership_structure_key_management" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_d8a4280500b3ae6e865fb70728" ON "cp_ownership_structure_key_management" ("ownership_structure_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_ownership_structure" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "ownership_agreements" boolean, "ownership_agreements_details" text, "foreign_agreements_contracts" boolean, "foreign_agreements_contracts_details" text, "foreign_interest_10_percent" boolean, "foreign_interest_10_percent_details" text, "business_foreign_ownership" boolean, "business_foreign_ownership_details" text, "voting_nominee_10_percent" boolean, "voting_nominee_10_percent_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_fb4cc22fc97d6592a478d18e5d" UNIQUE ("cp_id"), CONSTRAINT "PK_facc0acb10d4e1bda9f6600055f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_facc0acb10d4e1bda9f6600055" ON "cp_ownership_structure" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_fb4cc22fc97d6592a478d18e5d" ON "cp_ownership_structure" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" ADD CONSTRAINT "FK_3ae31b01c1ced0d2b5a31cbaf21" FOREIGN KEY ("ownership_structure_id") REFERENCES "cp_ownership_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" ADD CONSTRAINT "FK_d8a4280500b3ae6e865fb707283" FOREIGN KEY ("ownership_structure_id") REFERENCES "cp_ownership_structure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD CONSTRAINT "FK_fb4cc22fc97d6592a478d18e5d7" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP CONSTRAINT "FK_fb4cc22fc97d6592a478d18e5d7"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" DROP CONSTRAINT "FK_d8a4280500b3ae6e865fb707283"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" DROP CONSTRAINT "FK_3ae31b01c1ced0d2b5a31cbaf21"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fb4cc22fc97d6592a478d18e5d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_facc0acb10d4e1bda9f6600055"`);
    await queryRunner.query(`DROP TABLE "cp_ownership_structure"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d8a4280500b3ae6e865fb70728"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_659f40e96ed3da56644d9b766e"`);
    await queryRunner.query(`DROP TABLE "cp_ownership_structure_key_management"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3ae31b01c1ced0d2b5a31cbaf2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_47ad9e79bbafc4a2c711ca449b"`);
    await queryRunner.query(`DROP TABLE "cp_ownership_structure_details"`);
  }
}
