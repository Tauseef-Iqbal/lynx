import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCpCertifications1725460837221 implements MigrationInterface {
  name = 'CreateTablesCpCertifications1725460837221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_certifications" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "category" character varying(255), "certification_name" character varying(255), "status" character varying(50), "completion_date" date, "expected_completion_date" date, "deleted_at" TIMESTAMP WITH TIME ZONE, "cp_id" bigint NOT NULL, CONSTRAINT "PK_04c5d33ad86ed6c14bae1048559" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_04c5d33ad86ed6c14bae104855" ON "cp_certifications" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5351cb2f170aa36f0aa95965fe" ON "cp_certifications" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_certifications" ADD CONSTRAINT "FK_5351cb2f170aa36f0aa95965fef" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_certifications" DROP CONSTRAINT "FK_5351cb2f170aa36f0aa95965fef"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5351cb2f170aa36f0aa95965fe"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_04c5d33ad86ed6c14bae104855"`);
    await queryRunner.query(`DROP TABLE "cp_certifications"`);
  }
}
