import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695829992726 implements MigrationInterface {
    name = 'InitialMigration1695829992726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "status" TO "states"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "states" TO "status"`);
    }

}
