import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesPastPerformance1725386934119 implements MigrationInterface {
  name = 'CreateTablesPastPerformance1725386934119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "past_performance_testimonials" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "company_name_providing_testimonial" character varying(255), "testimonial_input" character varying(255), "cp_past_performanceEntity_id" bigint NOT NULL, CONSTRAINT "PK_6a76a0abfb5272cc936a440778f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_6a76a0abfb5272cc936a440778" ON "past_performance_testimonials" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_8a084fbaa69d5486a209c5ff3d" ON "past_performance_testimonials" ("company_name_providing_testimonial") `);
    await queryRunner.query(`CREATE INDEX "IDX_24ae6d835a39c88fdbbbd1d588" ON "past_performance_testimonials" ("cp_past_performanceEntity_id") `);
    await queryRunner.query(
      `CREATE TABLE "past_performance" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "contract_name" character varying(255), "contracting_agency_name" character varying(255), "contract_type" character varying(255), "contract_number" bigint, "buying_agency_name" character varying(255), "program_record_supported" character varying(255), "performance_period_start_date" date, "performance_period_end_date" date, "details_of_efforts" text, "subcontractors_partners" character varying, "supporting_docs" text array, "deleted_at" TIMESTAMP WITH TIME ZONE, "cp_id" bigint NOT NULL, CONSTRAINT "PK_980916ad6ca812086fe09894388" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_980916ad6ca812086fe0989438" ON "past_performance" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_c65019db96b587382ab8635a76" ON "past_performance" ("contract_name") `);
    await queryRunner.query(`CREATE INDEX "IDX_9cd23b2b0b6d50cc3335e09b18" ON "past_performance" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "past_performance_testimonials" ADD CONSTRAINT "FK_24ae6d835a39c88fdbbbd1d5883" FOREIGN KEY ("cp_past_performanceEntity_id") REFERENCES "past_performance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "past_performance" ADD CONSTRAINT "FK_9cd23b2b0b6d50cc3335e09b18f" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "past_performance" DROP CONSTRAINT "FK_9cd23b2b0b6d50cc3335e09b18f"`);
    await queryRunner.query(`ALTER TABLE "past_performance_testimonials" DROP CONSTRAINT "FK_24ae6d835a39c88fdbbbd1d5883"`);
    await queryRunner.query(`ALTER TABLE "company_profile" ALTER COLUMN "zip_code" DROP NOT NULL`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9cd23b2b0b6d50cc3335e09b18"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c65019db96b587382ab8635a76"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_980916ad6ca812086fe0989438"`);
    await queryRunner.query(`DROP TABLE "past_performance"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_24ae6d835a39c88fdbbbd1d588"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8a084fbaa69d5486a209c5ff3d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6a76a0abfb5272cc936a440778"`);
    await queryRunner.query(`DROP TABLE "past_performance_testimonials"`);
  }
}
