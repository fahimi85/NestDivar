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
exports.AppKeyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_key_entity_1 = require("./entities/app-key.entity");
let AppKeyService = class AppKeyService {
    constructor(appKeyRepository) {
        this.appKeyRepository = appKeyRepository;
    }
    create(createAppKeyDto) {
        return 'This action adds a new appKey';
    }
    findAll() {
        return `This action returns all appKey`;
    }
    findOne(key) {
        return this.appKeyRepository.findOne({
            key
        });
    }
    update(id, updateAppKeyDto) {
        return `This action updates a #${id} appKey`;
    }
    remove(id) {
        return `This action removes a #${id} appKey`;
    }
};
AppKeyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(app_key_entity_1.AppKeyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppKeyService);
exports.AppKeyService = AppKeyService;
//# sourceMappingURL=app-key.service.js.map