import { LoggerService } from 'src/logger/logger.service';
export declare class UserService {
    private readonly loggerService;
    constructor(loggerService: LoggerService);
    findAll(): string;
}
