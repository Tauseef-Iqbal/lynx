import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCpOwnershipStructureAndAssociatedTables1726094871839 implements MigrationInterface {
  name = 'UpdateCpOwnershipStructureAndAssociatedTables1726094871839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" DROP COLUMN "round_type"`);
    await queryRunner.query(`CREATE TYPE "public"."cp_ownership_structure_details_round_type_enum" AS ENUM('Founder''s Equity/Debt', 'Debt', 'SEED/Angel', 'Series A', 'Series B', 'Series C', 'Series D', 'PE')`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" ADD "round_type" "public"."cp_ownership_structure_details_round_type_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" DROP COLUMN "types_of_shares"`);
    await queryRunner.query(`CREATE TYPE "public"."cp_ownership_structure_details_types_of_shares_enum" AS ENUM('Common Stock', 'Preferred', 'Options')`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" ADD "types_of_shares" "public"."cp_ownership_structure_details_types_of_shares_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP COLUMN "ownership_agreements_details"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD "ownership_agreements_details" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP COLUMN "foreign_interest_10_percent_details"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD "foreign_interest_10_percent_details" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP COLUMN "business_foreign_ownership_details"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD "business_foreign_ownership_details" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP COLUMN "business_foreign_ownership_details"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD "business_foreign_ownership_details" text`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP COLUMN "foreign_interest_10_percent_details"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD "foreign_interest_10_percent_details" text`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" DROP COLUMN "ownership_agreements_details"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure" ADD "ownership_agreements_details" text`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" DROP COLUMN "types_of_shares"`);
    await queryRunner.query(`DROP TYPE "public"."cp_ownership_structure_details_types_of_shares_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" ADD "types_of_shares" jsonb`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" DROP COLUMN "round_type"`);
    await queryRunner.query(`DROP TYPE "public"."cp_ownership_structure_details_round_type_enum"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_details" ADD "round_type" text`);
  }
}
