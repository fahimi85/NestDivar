import { Repository } from 'typeorm';
import { CreateAppKeyDto } from './dto/create-app-key.dto';
import { UpdateAppKeyDto } from './dto/update-app-key.dto';
import { AppKeyEntity } from './entities/app-key.entity';
export declare class AppKeyService {
    private readonly appKeyRepository;
    constructor(appKeyRepository: Repository<AppKeyEntity>);
    create(createAppKeyDto: CreateAppKeyDto): string;
    findAll(): string;
    findOne(key: string): Promise<AppKeyEntity>;
    update(id: number, updateAppKeyDto: UpdateAppKeyDto): string;
    remove(id: number): string;
}
