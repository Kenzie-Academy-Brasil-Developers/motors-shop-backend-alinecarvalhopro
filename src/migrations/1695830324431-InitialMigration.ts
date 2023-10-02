import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695830324431 implements MigrationInterface {
    name = 'InitialMigration1695830324431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "description" TO "city"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "state" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "city" character varying(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "city" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "state" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "city" TO "description"`);
    }

}
