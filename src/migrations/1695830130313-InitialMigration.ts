import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695830130313 implements MigrationInterface {
    name = 'InitialMigration1695830130313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "states" TO "state"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "state" TO "states"`);
    }

}
