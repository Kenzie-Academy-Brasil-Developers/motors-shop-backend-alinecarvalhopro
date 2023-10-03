import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696267151166 implements MigrationInterface {
    name = 'InitialMigration1696267151166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "date"`);
    }

}
