"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenamePost1643115843265 = void 0;
class RenamePost1643115843265 {
    constructor() {
        this.name = 'RenamePost1643115843265';
    }
    async up(queryRunner) {
        await queryRunner.query(`EXEC sp_rename "typeorm_prod.dbo.post.name", "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`EXEC sp_rename "typeorm_prod.dbo.post.title", "name"`);
    }
}
exports.RenamePost1643115843265 = RenamePost1643115843265;
//# sourceMappingURL=1643115843265-RenamePost.js.map