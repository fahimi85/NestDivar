"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CurrencyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyModule = void 0;
const common_1 = require("@nestjs/common");
const token_constant_1 = require("./constants/token.constant");
const currency_service_1 = require("./currency.service");
let CurrencyModule = CurrencyModule_1 = class CurrencyModule {
    static forRoot(full) {
        return {
            module: CurrencyModule_1,
            imports: [],
            providers: [
                currency_service_1.CurrencyService,
                {
                    provide: token_constant_1.CURRENCY_SIGN,
                    useFactory: async (currencyService) => {
                        return currencyService.getCurrencySign(process.env.CURRENCY, full);
                    },
                    inject: [currency_service_1.CurrencyService],
                },
            ],
            exports: [token_constant_1.CURRENCY_SIGN],
        };
    }
};
CurrencyModule = CurrencyModule_1 = __decorate([
    (0, common_1.Module)({})
], CurrencyModule);
exports.CurrencyModule = CurrencyModule;
//# sourceMappingURL=currency.module.js.map