import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695835338326 implements MigrationInterface {
    name = 'InitialMigration1695835338326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birth" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birth"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birth" TIMESTAMP NOT NULL`);
    }

}
