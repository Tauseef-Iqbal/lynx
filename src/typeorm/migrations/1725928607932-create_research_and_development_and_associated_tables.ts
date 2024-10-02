import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResearchAndDevelopmentAndAssociatedTables1725928607932 implements MigrationInterface {
  name = 'CreateResearchAndDevelopmentAndAssociatedTables1725928607932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cp_research_and_development_innovations" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "name" character varying(255), "developed_year" integer, "description" text, "research_and_development_id" bigint NOT NULL, CONSTRAINT "PK_4f13f7d721048e461ac568f5b26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_4f13f7d721048e461ac568f5b2" ON "cp_research_and_development_innovations" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_41495938b0db551f3bd1cd4b60" ON "cp_research_and_development_innovations" ("research_and_development_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_research_and_development_research_papers" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "paper_title" character varying(255), "authors" text array, "publication_name" character varying(255), "date_of_publication" date, "DOI_link" character varying(255), "research_field" character varying(255), "associated_grant" character varying(255), "description" text, "research_and_development_id" bigint NOT NULL, CONSTRAINT "PK_aa3a2ca175f1ef13ce6533a78ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_aa3a2ca175f1ef13ce6533a78c" ON "cp_research_and_development_research_papers" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_d6c74c6e4bf35fcc61d431fbf8" ON "cp_research_and_development_research_papers" ("research_and_development_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_research_and_development_research_funding" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "funding_name" character varying(255), "funding_agency" character varying(255), "principal_investigators" text array, "publication_name" character varying(255), "award_amount" numeric, "funding_start_date" date, "funding_end_date" date, "DOI_link" character varying(255), "research_field" character varying(255), "projectDescription" text, "research_and_development_id" bigint NOT NULL, CONSTRAINT "PK_bb4cdee647e6c319e83d2bdd613" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_bb4cdee647e6c319e83d2bdd61" ON "cp_research_and_development_research_funding" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_afd4d07da9b6771099e23201e6" ON "cp_research_and_development_research_funding" ("research_and_development_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_research_and_development_research_institutions" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "collaborator_name" character varying(255), "affiliated_institution" character varying(255), "country" character varying(255), "project_title" character varying(255), "research_field" character varying(255), "collaboration_start_date" date, "project_role" character varying(255), "research_and_development_id" bigint NOT NULL, CONSTRAINT "PK_dc0678e7eda4022794f1e69b03a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_dc0678e7eda4022794f1e69b03" ON "cp_research_and_development_research_institutions" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_eacb11761539b9820a2b54a93c" ON "cp_research_and_development_research_institutions" ("research_and_development_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_research_and_development" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "research_and_development_team" boolean, "research_and_development_team_details" jsonb, "projects_offered_to_govt" boolean, "projects_offered_to_govt_details" text, "reseach_papers_10_years" boolean, "reseach_funding_10_years" boolean, "reseach_institutions_collaboration" boolean, "govt_grants_for_research" boolean, "interested_in_govt_grants_for_research" boolean, "govt_grants_for_research_details" jsonb, "controlled_technology_activities" boolean, "controlled_technology_activities_details" text, "joint_ventures" boolean, "joint_ventures_details" text, "intellectual_property_protection" boolean, "intellectual_property_protection_details" text, "cp_id" bigint NOT NULL, CONSTRAINT "REL_68898bf9aea970d9e18b0c54aa" UNIQUE ("cp_id"), CONSTRAINT "PK_286f74182575dea69d22b2b3c18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_286f74182575dea69d22b2b3c1" ON "cp_research_and_development" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_68898bf9aea970d9e18b0c54aa" ON "cp_research_and_development" ("cp_id") `);
    await queryRunner.query(
      `CREATE TABLE "cp_research_and_development_defence_patents" ("id" BIGSERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(3) with time zone, "patent_name" character varying(255), "patent_number" character varying(255), "patent_countries" text array, "patentee_names" text array, "date_of_grant" date, "date_of_expiration" date, "description" text, "research_and_development_id" bigint NOT NULL, CONSTRAINT "PK_cf299f96cc8439e2b62d30b7b4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_cf299f96cc8439e2b62d30b7b4" ON "cp_research_and_development_defence_patents" ("id") `);
    await queryRunner.query(`CREATE INDEX "IDX_f05644e434b37d0df17dee3a29" ON "cp_research_and_development_defence_patents" ("research_and_development_id") `);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_innovations" ADD CONSTRAINT "FK_41495938b0db551f3bd1cd4b607" FOREIGN KEY ("research_and_development_id") REFERENCES "cp_research_and_development"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_research_papers" ADD CONSTRAINT "FK_d6c74c6e4bf35fcc61d431fbf89" FOREIGN KEY ("research_and_development_id") REFERENCES "cp_research_and_development"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_research_funding" ADD CONSTRAINT "FK_afd4d07da9b6771099e23201e6f" FOREIGN KEY ("research_and_development_id") REFERENCES "cp_research_and_development"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_research_institutions" ADD CONSTRAINT "FK_eacb11761539b9820a2b54a93ce" FOREIGN KEY ("research_and_development_id") REFERENCES "cp_research_and_development"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development" ADD CONSTRAINT "FK_68898bf9aea970d9e18b0c54aa1" FOREIGN KEY ("cp_id") REFERENCES "company_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_defence_patents" ADD CONSTRAINT "FK_f05644e434b37d0df17dee3a293" FOREIGN KEY ("research_and_development_id") REFERENCES "cp_research_and_development"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_defence_patents" DROP CONSTRAINT "FK_f05644e434b37d0df17dee3a293"`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development" DROP CONSTRAINT "FK_68898bf9aea970d9e18b0c54aa1"`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_research_institutions" DROP CONSTRAINT "FK_eacb11761539b9820a2b54a93ce"`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_research_funding" DROP CONSTRAINT "FK_afd4d07da9b6771099e23201e6f"`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_research_papers" DROP CONSTRAINT "FK_d6c74c6e4bf35fcc61d431fbf89"`);
    await queryRunner.query(`ALTER TABLE "cp_research_and_development_innovations" DROP CONSTRAINT "FK_41495938b0db551f3bd1cd4b607"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f05644e434b37d0df17dee3a29"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_cf299f96cc8439e2b62d30b7b4"`);
    await queryRunner.query(`DROP TABLE "cp_research_and_development_defence_patents"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_68898bf9aea970d9e18b0c54aa"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_286f74182575dea69d22b2b3c1"`);
    await queryRunner.query(`DROP TABLE "cp_research_and_development"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_eacb11761539b9820a2b54a93c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_dc0678e7eda4022794f1e69b03"`);
    await queryRunner.query(`DROP TABLE "cp_research_and_development_research_institutions"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_afd4d07da9b6771099e23201e6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bb4cdee647e6c319e83d2bdd61"`);
    await queryRunner.query(`DROP TABLE "cp_research_and_development_research_funding"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d6c74c6e4bf35fcc61d431fbf8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_aa3a2ca175f1ef13ce6533a78c"`);
    await queryRunner.query(`DROP TABLE "cp_research_and_development_research_papers"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_41495938b0db551f3bd1cd4b60"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4f13f7d721048e461ac568f5b2"`);
    await queryRunner.query(`DROP TABLE "cp_research_and_development_innovations"`);
  }
}
