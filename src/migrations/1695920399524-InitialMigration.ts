import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695920399524 implements MigrationInterface {
    name = 'InitialMigration1695920399524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
