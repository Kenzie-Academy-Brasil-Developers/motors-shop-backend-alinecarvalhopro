import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696339170654 implements MigrationInterface {
    name = 'InitialMigration1696339170654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "date" DROP DEFAULT`);
    }

}
