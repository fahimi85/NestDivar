import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ExceptionLogService } from 'src/logger/exception-log/exception-log.service';
export declare class LogExceptionFilter implements ExceptionFilter {
    private exceptionLogService;
    constructor(exceptionLogService: ExceptionLogService);
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}
