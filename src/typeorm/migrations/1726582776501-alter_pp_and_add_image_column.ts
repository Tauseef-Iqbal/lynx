import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPpAndAddImageColumn1726582776501 implements MigrationInterface {
  name = 'AlterPpAndAddImageColumn1726582776501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" ADD "product_or_service_image" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_products_and_services" DROP COLUMN "product_or_service_image"`);
  }
}
