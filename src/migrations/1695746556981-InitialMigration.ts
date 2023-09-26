import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695746556981 implements MigrationInterface {
    name = 'InitialMigration1695746556981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD "announcementId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "fuel" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "fuel"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "announcementId"`);
    }

}
