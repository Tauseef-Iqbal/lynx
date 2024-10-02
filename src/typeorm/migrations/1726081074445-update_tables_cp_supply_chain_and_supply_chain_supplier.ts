import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesCpSupplyChainAndSupplyChainSupplier1726081074445 implements MigrationInterface {
  name = 'UpdateTablesCpSupplyChainAndSupplyChainSupplier1726081074445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_supply_chain_supplier" ADD "supplier_role_description" text`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" DROP COLUMN "sole_source_suppliers"`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" ADD "sole_source_suppliers" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" DROP COLUMN "sole_source_suppliers"`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain" ADD "sole_source_suppliers" text`);
    await queryRunner.query(`ALTER TABLE "cp_supply_chain_supplier" DROP COLUMN "supplier_role_description"`);
  }
}
