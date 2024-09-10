import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesDataComplianceDocumentation1725917455917 implements MigrationInterface {
  name = 'CreateTablesDataComplianceDocumentation1725917455917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_data_compliance_documentation" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "hasDataGovernancePolicy" boolean NOT NULL, "dataGovernancePolicyDetails" character varying(250), "hasDlpStrategy" boolean NOT NULL, "dlpStrategyDetails" character varying(250), "hasAccessLog" boolean NOT NULL, "accessLogDetails" character varying(250), "hasIncidentResponsePlan" boolean NOT NULL, "incidentResponseDetails" character varying(250), "hasPrivacyActPolicy" boolean NOT NULL, "privacyActPolicyDetails" character varying(250), "hasDataDisposalProcedure" boolean NOT NULL, "dataDisposalProcedureDetails" character varying(250), "deleted_at" TIMESTAMP WITH TIME ZONE, "cp_id" bigint NOT NULL, CONSTRAINT "REL_2ff24a186ce5d7910fa96d7fd5" UNIQUE ("cp_id"), CONSTRAINT "PK_5d983293adfb4b04012866e3239" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5d983293adfb4b04012866e323" ON "cp_data_compliance_documentation" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_2ff24a186ce5d7910fa96d7fd5" ON "cp_data_compliance_documentation" ("cp_id") `);
    await queryRunner.query(`ALTER TABLE "cp_data_compliance_documentation" ADD CONSTRAINT "FK_2ff24a186ce5d7910fa96d7fd59" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_data_compliance_documentation" DROP CONSTRAINT "FK_2ff24a186ce5d7910fa96d7fd59"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2ff24a186ce5d7910fa96d7fd5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5d983293adfb4b04012866e323"`);
    await queryRunner.query(`DROP TABLE "cp_data_compliance_documentation"`);
  }
}
