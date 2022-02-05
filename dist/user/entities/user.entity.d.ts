import { EventEntity } from 'src/event/entities/event.entity';
import { PostEntity } from 'src/post/entities/post.entity';
export declare class UserEntity {
    id: number;
    name: string;
    posts: PostEntity[];
    events: EventEntity[];
}
