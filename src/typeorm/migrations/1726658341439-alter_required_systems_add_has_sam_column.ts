import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRequiredSystemsAddHasSamColumn1726658341439 implements MigrationInterface {
  name = 'AlterRequiredSystemsAddHasSamColumn1726658341439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_systems" ADD "has_sam" boolean DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "required_systems" DROP COLUMN "has_sam"`);
  }
}
