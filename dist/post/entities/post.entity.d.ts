import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryEntity } from './category.entity';
export declare class PostEntity {
    id: number;
    title: string;
    content: string;
    location: string;
    categories: CategoryEntity[];
    likeCount: number;
    user: UserEntity;
    price: number;
}
