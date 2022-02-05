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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppKeyGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_key_service_1 = require("../../app-key/app-key.service");
const is_public_decorator_1 = require("./is-public.decorator");
let AppKeyGuard = class AppKeyGuard {
    constructor(appKeyService, reflector) {
        this.appKeyService = appKeyService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.get(is_public_decorator_1.IS_PUBLIC, context.getHandler());
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        let appKey;
        if (request.headers['x-app-key']) {
            appKey = request.headers['x-app-key'];
        }
        else {
            throw new common_1.BadRequestException(`Header must have x-app-key`);
        }
        const entity = await this.appKeyService.findOne(appKey);
        if (!entity) {
            return false;
        }
        return true;
    }
};
AppKeyGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_key_service_1.AppKeyService,
        core_1.Reflector])
], AppKeyGuard);
exports.AppKeyGuard = AppKeyGuard;
//# sourceMappingURL=app-key.guard.js.map