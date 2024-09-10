import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesCpRequiredSystems1725906698722 implements MigrationInterface {
  name = 'CreateTablesCpRequiredSystems1725906698722';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "required_system_business_classification" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "classification_name" character varying(255) NOT NULL, "required_system_id" bigint NOT NULL, CONSTRAINT "PK_c8631693646b376cdbb39550bf2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_c8631693646b376cdbb39550bf" ON "required_system_business_classification" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_693a3810994c703613b53cda14" ON "required_system_business_classification" ("required_system_id") `);
    await queryRunner.query(
      `CREATE TABLE "required_system_certification" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "certification_name" character varying(255) NOT NULL, "date" date, "number" character varying(255), "required_system_id" bigint NOT NULL, CONSTRAINT "PK_7bc7e9c664c35b13d022932d33a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_7bc7e9c664c35b13d022932d33" ON "required_system_certification" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_e3f497eb4ab66934552e20e476" ON "required_system_certification" ("required_system_id") `);
    await queryRunner.query(
      `CREATE TABLE "required_system_types" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "system_name" character varying(255) NOT NULL, "system_description" text, "system_type" character varying(255), "dpas_approval_number" character varying(255), "compliance_details" character varying(255), "required_system_id" bigint NOT NULL, CONSTRAINT "PK_130b97b7e498337e870bcb52782" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_130b97b7e498337e870bcb5278" ON "required_system_types" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_fb944d30f73e7810f4917bf19b" ON "required_system_types" ("required_system_id") `);
    await queryRunner.query(
      `CREATE TABLE "required_systems" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "cybersecurity_systems_level" text, "supports_government_integration" boolean NOT NULL DEFAULT false, "government_integration_details" text, "deletedAt" TIMESTAMP, "cp_id" bigint NOT NULL, CONSTRAINT "PK_04656dd743d761c7b9024df8578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_04656dd743d761c7b9024df857" ON "required_systems" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_e78e85c4eb7faf6000cafcf3d2" ON "required_systems" ("cp_id") `);

    await queryRunner.query(`ALTER TABLE "required_system_business_classification" ADD CONSTRAINT "FK_693a3810994c703613b53cda141" FOREIGN KEY ("required_system_id") REFERENCES "required_systems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "required_system_certification" ADD CONSTRAINT "FK_e3f497eb4ab66934552e20e476f" FOREIGN KEY ("required_system_id") REFERENCES "required_systems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "required_system_types" ADD CONSTRAINT "FK_fb944d30f73e7810f4917bf19b7" FOREIGN KEY ("required_system_id") REFERENCES "required_systems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "required_systems" ADD CONSTRAINT "FK_e78e85c4eb7faf6000cafcf3d29" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_systems" DROP CONSTRAINT "FK_e78e85c4eb7faf6000cafcf3d29"`);
    await queryRunner.query(`ALTER TABLE "required_system_types" DROP CONSTRAINT "FK_fb944d30f73e7810f4917bf19b7"`);
    await queryRunner.query(`ALTER TABLE "required_system_certification" DROP CONSTRAINT "FK_e3f497eb4ab66934552e20e476f"`);
    await queryRunner.query(`ALTER TABLE "required_system_business_classification" DROP CONSTRAINT "FK_693a3810994c703613b53cda141"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e78e85c4eb7faf6000cafcf3d2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_04656dd743d761c7b9024df857"`);
    await queryRunner.query(`DROP TABLE "required_systems"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fb944d30f73e7810f4917bf19b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_130b97b7e498337e870bcb5278"`);
    await queryRunner.query(`DROP TABLE "required_system_types"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e3f497eb4ab66934552e20e476"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7bc7e9c664c35b13d022932d33"`);
    await queryRunner.query(`DROP TABLE "required_system_certification"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_693a3810994c703613b53cda14"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c8631693646b376cdbb39550bf"`);
    await queryRunner.query(`DROP TABLE "required_system_business_classification"`);
  }
}
