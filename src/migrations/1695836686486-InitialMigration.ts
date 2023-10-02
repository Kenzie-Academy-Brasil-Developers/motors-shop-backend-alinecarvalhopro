import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695836686486 implements MigrationInterface {
    name = 'InitialMigration1695836686486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "account" TO "seller"`);
        await queryRunner.query(`ALTER TYPE "public"."users_account_enum" RENAME TO "users_seller_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "seller"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "seller" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "seller"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "seller" "public"."users_seller_enum" NOT NULL DEFAULT 'buyer'`);
        await queryRunner.query(`ALTER TYPE "public"."users_seller_enum" RENAME TO "users_account_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "seller" TO "account"`);
    }

}
