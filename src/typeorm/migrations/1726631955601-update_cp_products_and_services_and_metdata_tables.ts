import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCpProductsAndServicesAndMetdataTables1726631955601 implements MigrationInterface {
  name = 'UpdateCpProductsAndServicesAndMetdataTables1726631955601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_c4f6139e8c345fa552c84e7ae4"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP COLUMN "additional_info"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP COLUMN "supporting_materials"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "uploaded_materials"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "product_or_service_image"`);
    await queryRunner.query(`CREATE TYPE "public"."cp_products_and_services_metadata_information_type_enum" AS ENUM('Technical Specifications', 'Customization Options', 'Integrations', 'Support & Maintenance', 'Training', 'Product Roadmap', 'References & Testimonials', 'Other')`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD "information_type" "public"."cp_products_and_services_metadata_information_type_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD "additional_information" text`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD "assets" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "offering_type" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "image" text`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "assets" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`CREATE INDEX "IDX_1ca97d9c37265a95fee469c9a4" ON "cp_products_and_services_metadata" ("information_type") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_1ca97d9c37265a95fee469c9a4"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ALTER COLUMN "name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "assets"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "offering_type"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP COLUMN "assets"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP COLUMN "additional_information"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" DROP COLUMN "information_type"`);
    await queryRunner.query(`DROP TYPE "public"."cp_products_and_services_metadata_information_type_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "product_or_service_image" text`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "uploaded_materials" text array`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "type" character varying(60)`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD "supporting_materials" text array`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD "additional_info" text`);
    await queryRunner.query(`ALTER TABLE "cp_products_and_services_metadata" ADD "type" character varying(60)`);
    await queryRunner.query(`CREATE INDEX "IDX_c4f6139e8c345fa552c84e7ae4" ON "cp_products_and_services_metadata" ("type") `);
  }
}
