"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppKeyController = void 0;
const common_1 = require("@nestjs/common");
const app_key_service_1 = require("./app-key.service");
const create_app_key_dto_1 = require("./dto/create-app-key.dto");
const update_app_key_dto_1 = require("./dto/update-app-key.dto");
let AppKeyController = class AppKeyController {
    constructor(appKeyService) {
        this.appKeyService = appKeyService;
    }
    create(createAppKeyDto) {
        return this.appKeyService.create(createAppKeyDto);
    }
    findAll() {
        return this.appKeyService.findAll();
    }
    findOne(id) { }
    update(id, updateAppKeyDto) {
        return this.appKeyService.update(+id, updateAppKeyDto);
    }
    remove(id) {
        return this.appKeyService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_app_key_dto_1.CreateAppKeyDto]),
    __metadata("design:returntype", void 0)
], AppKeyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppKeyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppKeyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_app_key_dto_1.UpdateAppKeyDto]),
    __metadata("design:returntype", void 0)
], AppKeyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppKeyController.prototype, "remove", null);
AppKeyController = __decorate([
    (0, common_1.Controller)('app-key'),
    __metadata("design:paramtypes", [app_key_service_1.AppKeyService])
], AppKeyController);
exports.AppKeyController = AppKeyController;
//# sourceMappingURL=app-key.controller.js.map