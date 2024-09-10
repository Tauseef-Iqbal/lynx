import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLegalStructureColumnType1725976284272 implements MigrationInterface {
  name = 'UpdateLegalStructureColumnType1725976284272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "legal_structure"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "legal_structure" character varying(255) array`);
    await queryRunner.query(`CREATE INDEX "IDX_fc543ad010f7fe8e373da63825" ON "cp_legal_structure" ("legal_structure") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" DROP COLUMN "legal_structure"`);
    await queryRunner.query(`ALTER TABLE "cp_legal_structure" ADD "legal_structure" character varying(255)`);
    await queryRunner.query(`CREATE INDEX "IDX_fc543ad010f7fe8e373da63825" ON "cp_legal_structure" ("legal_structure") `);
  }
}
