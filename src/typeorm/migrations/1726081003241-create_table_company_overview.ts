import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompanyOverview1726081003241 implements MigrationInterface {
  name = 'CreateTableCompanyOverview1726081003241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company_overview" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "company_snapshot" text, "differentiators" text array, "competencies" text array, "capabilities" text array, "values" text array, "deleted_at" TIMESTAMP WITH TIME ZONE, "cp_id" bigint NOT NULL, CONSTRAINT "REL_11519a342ab65a66929ba5625a" UNIQUE ("cp_id"), CONSTRAINT "PK_10cfdc0fe49f49ca33579daaa83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_10cfdc0fe49f49ca33579daaa8" ON "company_overview" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_11519a342ab65a66929ba5625a" ON "company_overview" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "company_overview" ADD CONSTRAINT "FK_11519a342ab65a66929ba5625aa" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company_overview" DROP CONSTRAINT "FK_11519a342ab65a66929ba5625aa"`);
    await queryRunner.query(`DROP TABLE "company_overview"`);
  }
}
