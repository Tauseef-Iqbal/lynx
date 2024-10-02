import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGetColumnCountFunction1627556812507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION get_column_count(table_name text)
      RETURNS integer AS $$
      DECLARE
          column_count integer;
      BEGIN
          EXECUTE format('
            SELECT COUNT(*)
            FROM information_schema.columns c
            WHERE c.table_name = %L
            AND c.column_name NOT IN (''id'', ''created_at'', ''updated_at'', ''is_deleted'')
            AND NOT EXISTS (
              SELECT 1
              FROM information_schema.constraint_column_usage ccu
              JOIN information_schema.table_constraints tc
              ON ccu.constraint_name = tc.constraint_name
              WHERE tc.constraint_type = ''FOREIGN KEY''
              AND ccu.column_name = c.column_name
              AND ccu.table_name = %L
              AND ccu.table_schema = ''public''
            )
            AND c.table_schema = ''public''', table_name, table_name) INTO column_count;

          RETURN column_count;
      END;
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS get_column_count(text);
    `);
  }
}
