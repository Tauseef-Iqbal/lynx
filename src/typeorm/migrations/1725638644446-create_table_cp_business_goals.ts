import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCpBusinessGoals1725638644446 implements MigrationInterface {
  name = 'CreateTableCpBusinessGoals1725638644446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_business_goals" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "growth_and_expansion" text array, "collaboration" text array, "procurement" text array, "operations" text array, "branding_and_marketing" text array, "cp_id" bigint NOT NULL, CONSTRAINT "REL_5cc55ffe4b52ee0d02a28eeee1" UNIQUE ("cp_id"), CONSTRAINT "PK_82b3ef4e9819a7230616fe72121" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_82b3ef4e9819a7230616fe7212" ON "cp_business_goals" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5cc55ffe4b52ee0d02a28eeee1" ON "cp_business_goals" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_business_goals" ADD CONSTRAINT "FK_5cc55ffe4b52ee0d02a28eeee1b" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_business_goals" DROP CONSTRAINT "FK_5cc55ffe4b52ee0d02a28eeee1b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5cc55ffe4b52ee0d02a28eeee1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_82b3ef4e9819a7230616fe7212"`);
    await queryRunner.query(`DROP TABLE "cp_business_goals"`);
  }
}
