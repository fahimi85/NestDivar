import { RefTypeEnum } from 'src/enums/ref-type.enum';
import { Repository } from 'typeorm';
import { EventEntity, EventTypes } from './entities/event.entity';
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<EventEntity>);
    getEventByUser(refId: number, refType: RefTypeEnum, userId: number, type: EventTypes): Promise<EventEntity[]>;
}
