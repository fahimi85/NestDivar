"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublic = exports.IS_PUBLIC = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC = 'isPublic';
const isPublic = () => {
    return (0, common_1.SetMetadata)(exports.IS_PUBLIC, true);
};
exports.isPublic = isPublic;
//# sourceMappingURL=is-public.decorator.js.map