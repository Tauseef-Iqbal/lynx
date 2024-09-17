import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAwardOfficalDocs1726252717497 implements MigrationInterface {
  name = 'CreateTableAwardOfficalDocs1726252717497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_awards_official_docs" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "cp_award_id" bigint NOT NULL, CONSTRAINT "PK_01211e89200618c505c84dda254" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_01211e89200618c505c84dda25" ON "cp_awards_official_docs" ("id") `);
    await queryRunner.query(`ALTER TABLE "cp_awards" DROP COLUMN "documentation"`);
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" ADD CONSTRAINT "FK_aa837f0ad3619e859efb413945c" FOREIGN KEY ("cp_award_id") REFERENCES "cp_awards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_awards_official_docs" DROP CONSTRAINT "FK_aa837f0ad3619e859efb413945c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_01211e89200618c505c84dda25"`);
    await queryRunner.query(`DROP TABLE "cp_awards_official_docs"`);
  }
}
