import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695921442613 implements MigrationInterface {
    name = 'InitialMigration1695921442613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "url" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "url" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
