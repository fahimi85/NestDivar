import { UserEntity } from 'src/user/entities/user.entity';
export declare enum EventTypes {
    Liked = "LIKED",
    Commented = "COMMENTED"
}
export declare class EventEntity {
    id: number;
    message: EventTypes;
    refType: string;
    refId: number;
    user: UserEntity;
}
