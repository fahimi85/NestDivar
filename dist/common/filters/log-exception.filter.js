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
exports.LogExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const exception_log_service_1 = require("../../logger/exception-log/exception-log.service");
let LogExceptionFilter = class LogExceptionFilter {
    constructor(exceptionLogService) {
        this.exceptionLogService = exceptionLogService;
    }
    async catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const error = exception.getResponse();
        let myResponse;
        if (typeof error === 'string') {
            myResponse = { message: error };
        }
        else {
            myResponse = error;
        }
        const log = await this.exceptionLogService.insertLog(exception.getStatus(), myResponse.message);
        response.status(exception.getStatus()).json(Object.assign(Object.assign({}, myResponse), { logId: log.id }));
    }
};
LogExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [exception_log_service_1.ExceptionLogService])
], LogExceptionFilter);
exports.LogExceptionFilter = LogExceptionFilter;
//# sourceMappingURL=log-exception.filter.js.map