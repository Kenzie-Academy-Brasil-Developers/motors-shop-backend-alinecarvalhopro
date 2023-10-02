import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695823858384 implements MigrationInterface {
    name = 'InitialMigration1695823858384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "cep" character varying(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "cep" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
