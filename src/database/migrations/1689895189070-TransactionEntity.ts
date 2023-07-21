import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionEntity1689895189070 implements MigrationInterface {
    name = 'TransactionEntity1689895189070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions"."transactions" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "value" double precision NOT NULL, "type" character(1) NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "transactions"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions"."transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "cpf" character(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transactions"."users" DROP COLUMN "email"`);
        await queryRunner.query(`DROP TABLE "transactions"."transactions"`);
    }

}
