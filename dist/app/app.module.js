"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const app_config_1 = require("./config/app.config");
const post_module_1 = require("../post/post.module");
const user_module_1 = require("../user/user.module");
const event_module_1 = require("../event/event.module");
const utility_module_1 = require("../utility/utility.module");
const currency_module_1 = require("../currency/currency.module");
const logger_module_1 = require("../logger/logger.module");
const translate_module_1 = require("../translate/translate.module");
const textfields_module_1 = require("../textfields/textfields.module");
const post_config_1 = require("../post/config/post.config");
const user_service_1 = require("../user/user.service");
const core_1 = require("@nestjs/core");
const log_exception_filter_1 = require("../common/filters/log-exception.filter");
const app_key_guard_1 = require("../common/guards/app-key.guard");
const app_key_module_1 = require("../app-key/app-key.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_config_1.default],
                validationSchema: Joi.object({
                    HOST: Joi.string().required(),
                    PORT: Joi.number().required(),
                    USER_NAME: Joi.string().default('user1'),
                    VALIDATION_WHITE_LIST: Joi.boolean(),
                    FORBIDDEN_NON_WHITE_LISTED: Joi.boolean(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule.forFeature(app_config_1.default)],
                useFactory: (app) => {
                    return Object.assign(Object.assign({ type: 'mssql' }, app.database), { extra: {
                            trustServerCertificate: true,
                        }, synchronize: true, autoLoadEntities: true });
                },
                inject: [app_config_1.default.KEY],
            }),
            user_module_1.UserModule,
            event_module_1.EventModule,
            utility_module_1.UtilityModule,
            currency_module_1.CurrencyModule,
            logger_module_1.LoggerModule,
            translate_module_1.TranslateModule,
            textfields_module_1.TextfieldsModule,
            post_module_1.PostModule,
            app_key_module_1.AppKeyModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: log_exception_filter_1.LogExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: app_key_guard_1.AppKeyGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map