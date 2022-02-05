"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('root', () => ({
    database: {
        host: process.env.HOST,
        port: +(process.env.PORT || 1433),
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
}));
//# sourceMappingURL=app.config.js.map