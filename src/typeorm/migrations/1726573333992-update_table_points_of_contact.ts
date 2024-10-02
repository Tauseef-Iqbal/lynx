import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablePointsOfContact1726573333992 implements MigrationInterface {
  name = 'UpdateTablePointsOfContact1726573333992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" DROP CONSTRAINT "FK_5ee6315f95c252ae7c967d9d5eb"`);
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" DROP CONSTRAINT "REL_5ee6315f95c252ae7c967d9d5e"`);
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" ADD CONSTRAINT "FK_5ee6315f95c252ae7c967d9d5eb" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" DROP CONSTRAINT "FK_5ee6315f95c252ae7c967d9d5eb"`);
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" ADD CONSTRAINT "REL_5ee6315f95c252ae7c967d9d5e" UNIQUE ("cp_id")`);
    await queryRunner.query(`ALTER TABLE "cp_points_of_contact" ADD CONSTRAINT "FK_5ee6315f95c252ae7c967d9d5eb" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
