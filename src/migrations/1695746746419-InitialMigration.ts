import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695746746419 implements MigrationInterface {
    name = 'InitialMigration1695746746419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "UQ_95c93a584de49f0b0e13f753630" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "UQ_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "userId"`);
    }

}
