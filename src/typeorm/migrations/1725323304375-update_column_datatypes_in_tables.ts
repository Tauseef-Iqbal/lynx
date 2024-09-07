import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnDatatypesInTables1725323304375 implements MigrationInterface {
  name = 'UpdateColumnDatatypesInTables1725323304375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_affiliation"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_affiliation" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" ADD "name" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" ADD "role" character varying(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" ADD "role" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "cp_ownership_structure_key_management" ADD "name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" DROP COLUMN "foreign_affiliation"`);
    await queryRunner.query(`ALTER TABLE "cp_funding_sources" ADD "foreign_affiliation" character varying`);
  }
}
