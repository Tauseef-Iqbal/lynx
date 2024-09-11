import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnInSupplyChainTable1726009150883 implements MigrationInterface {
  name = 'AddColumnInSupplyChainTable1726009150883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" ADD "sole_source_suppliers_details" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" DROP COLUMN "sole_source_suppliers_details"`);
  }
}
