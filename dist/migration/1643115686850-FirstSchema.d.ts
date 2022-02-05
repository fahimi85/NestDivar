import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FirstSchema1643115686850 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
