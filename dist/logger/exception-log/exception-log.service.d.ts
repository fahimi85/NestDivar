import { Repository } from 'typeorm';
import { ExceptionLogEntity } from '../entities/exception-log.entity';
export declare class ExceptionLogService {
    private readonly exceptionLogRepository;
    constructor(exceptionLogRepository: Repository<ExceptionLogEntity>);
    insertLog(statusCode: number, message: string): Promise<ExceptionLogEntity>;
}
