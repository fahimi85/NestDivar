"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_key_module_1 = require("../app-key/app-key.module");
const currency_module_1 = require("../currency/currency.module");
const event_entity_1 = require("../event/entities/event.entity");
const event_module_1 = require("../event/event.module");
const logger_module_1 = require("../logger/logger.module");
const utility_module_1 = require("../utility/utility.module");
const post_config_1 = require("./config/post.config");
const category_entity_1 = require("./entities/category.entity");
const post_entity_1 = require("./entities/post.entity");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(post_config_1.default),
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.PostEntity, category_entity_1.CategoryEntity, event_entity_1.EventEntity]),
            currency_module_1.CurrencyModule.forRoot(true),
            event_module_1.EventModule,
            utility_module_1.UtilityModule,
            logger_module_1.LoggerModule,
            app_key_module_1.AppKeyModule,
        ],
        controllers: [post_controller_1.PostController],
        providers: [
            post_service_1.PostService,
            {
                provide: 'MAIL_API',
                useValue: 'http://mail.google.com',
            },
        ],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map