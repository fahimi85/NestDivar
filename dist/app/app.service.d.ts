import { ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
export declare class AppService {
    private readonly app;
    constructor(app: ConfigType<typeof appConfig>);
    getHello(): string;
}
