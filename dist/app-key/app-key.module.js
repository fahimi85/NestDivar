"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppKeyModule = void 0;
const common_1 = require("@nestjs/common");
const app_key_service_1 = require("./app-key.service");
const app_key_controller_1 = require("./app-key.controller");
const typeorm_1 = require("@nestjs/typeorm");
const app_key_entity_1 = require("./entities/app-key.entity");
let AppKeyModule = class AppKeyModule {
};
AppKeyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([app_key_entity_1.AppKeyEntity])],
        controllers: [app_key_controller_1.AppKeyController],
        providers: [app_key_service_1.AppKeyService],
        exports: [app_key_service_1.AppKeyService],
    })
], AppKeyModule);
exports.AppKeyModule = AppKeyModule;
//# sourceMappingURL=app-key.module.js.map