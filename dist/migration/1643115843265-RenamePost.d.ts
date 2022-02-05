import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RenamePost1643115843265 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
