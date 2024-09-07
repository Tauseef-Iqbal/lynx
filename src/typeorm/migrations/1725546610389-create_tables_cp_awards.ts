import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCpAwards1725546610389 implements MigrationInterface {
  name = 'CreateTablesCpAwards1725546610389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_awards" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name_of_award" character varying(255), "awarding_organization" character varying(255), "date_of_award" date, "award_description" text, "documentation" text array, "deleted_at" TIMESTAMP WITH TIME ZONE, "cp_id" bigint NOT NULL, CONSTRAINT "PK_16e1d535b94e7822d79d3c55fb6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_16e1d535b94e7822d79d3c55fb" ON "cp_awards" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_173872a0ac961f06ff1d9da7eb" ON "cp_awards" ("name_of_award") `);
    await queryRunner.query(`CREATE INDEX "IDX_65d0856a010f13731bbd1bb061" ON "cp_awards" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_awards" ADD CONSTRAINT "FK_65d0856a010f13731bbd1bb061d" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_awards" DROP CONSTRAINT "FK_65d0856a010f13731bbd1bb061d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_65d0856a010f13731bbd1bb061"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_173872a0ac961f06ff1d9da7eb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_16e1d535b94e7822d79d3c55fb"`);
    await queryRunner.query(`DROP TABLE "cp_awards"`);
  }
}
