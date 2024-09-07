import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCpProductsAndServices1725041262439 implements MigrationInterface {
  name = 'CreateTablesCpProductsAndServices1725041262439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_products_and_services_metadata" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "deleted_at" TIMESTAMP with time zone DEFAULT NULL, "type" character varying(60), "additional_info" text, "supporting_materials" text array, "cp_products_and_services_id" bigint NOT NULL, CONSTRAINT "PK_ca04a28afae80ce8683a4801599" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_ca04a28afae80ce8683a480159" ON "cp_products_and_services_metadata" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_c4f6139e8c345fa552c84e7ae4" ON "cp_products_and_services_metadata" ("type") `);
    await queryRunner.query(`CREATE INDEX "IDX_c4178bfe3954778097696ca400" ON "cp_products_and_services_metadata" ("cp_products_and_services_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_products_and_services" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "deleted_at" TIMESTAMP with time zone DEFAULT NULL, "name" character varying(255), "type" character varying(60), "description" text, "trl_specification" character varying(255), "mrl_specification" character varying(255), "compnay_differentiators" character varying(255) array, "challenges_addressed" text, "uploaded_materials" text array, "cp_id" bigint NOT NULL, CONSTRAINT "PK_735b2f0575e933933d5ac81939c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_735b2f0575e933933d5ac81939" ON "cp_products_and_services" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_b998d8be8df74e016da9473198" ON "cp_products_and_services" ("name") `);
    await queryRunner.query(`CREATE INDEX "IDX_8d5f408b39c5529ede1454241a" ON "cp_products_and_services" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD CONSTRAINT "FK_c4178bfe3954778097696ca4006" FOREIGN KEY ("cp_products_and_services_id") REFERENCES "cp_products_and_services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD CONSTRAINT "FK_8d5f408b39c5529ede1454241a2" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP CONSTRAINT "FK_8d5f408b39c5529ede1454241a2"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP CONSTRAINT "FK_c4178bfe3954778097696ca4006"`);

    await queryRunner.query(`DROP INDEX "public"."IDX_c4178bfe3954778097696ca400"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c4f6139e8c345fa552c84e7ae4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ca04a28afae80ce8683a480159"`);
    await queryRunner.query(`DROP TABLE "cp_products_and_services_metadata"`);

    await queryRunner.query(`DROP INDEX "public"."IDX_8d5f408b39c5529ede1454241a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b998d8be8df74e016da9473198"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_735b2f0575e933933d5ac81939"`);
    await queryRunner.query(`DROP TABLE "cp_products_and_services"`);
  }
}
