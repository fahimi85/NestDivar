import { AppKeyService } from './app-key.service';
import { CreateAppKeyDto } from './dto/create-app-key.dto';
import { UpdateAppKeyDto } from './dto/update-app-key.dto';
export declare class AppKeyController {
    private readonly appKeyService;
    constructor(appKeyService: AppKeyService);
    create(createAppKeyDto: CreateAppKeyDto): string;
    findAll(): string;
    findOne(id: string): void;
    update(id: string, updateAppKeyDto: UpdateAppKeyDto): string;
    remove(id: string): string;
}
