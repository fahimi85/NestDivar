"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const token_constant_1 = require("../currency/constants/token.constant");
const ref_type_enum_1 = require("../enums/ref-type.enum");
const event_entity_1 = require("../event/entities/event.entity");
const event_service_1 = require("../event/event.service");
const logger_service_1 = require("../logger/logger.service");
const typeorm_2 = require("typeorm");
const post_config_1 = require("./config/post.config");
const category_entity_1 = require("./entities/category.entity");
const post_entity_1 = require("./entities/post.entity");
let PostService = class PostService {
    constructor(mailApi, postRepository, categoryRepository, eventRepository, connection, eventService, currencySign, loggerService, postconfig) {
        this.mailApi = mailApi;
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.eventRepository = eventRepository;
        this.connection = connection;
        this.eventService = eventService;
        this.currencySign = currencySign;
        this.loggerService = loggerService;
        this.postconfig = postconfig;
        this.loggerService.setPrefix('PostService');
        this.loggerService.log(`constructor, mail api is: ${mailApi}`);
        this.loggerService.log(`constructor, Currency Sign is: ${this.currencySign}`);
        this.loggerService.log(`SHOW_MOBILE_NUMBER: ${this.postconfig.showMobileNumber}`);
    }
    findAll(pagination) {
        this.loggerService.log('findAll Called');
        return this.postRepository.find({
            relations: ['categories'],
            skip: (pagination === null || pagination === void 0 ? void 0 : pagination.page) * (pagination === null || pagination === void 0 ? void 0 : pagination.pageCount),
            take: pagination === null || pagination === void 0 ? void 0 : pagination.pageCount,
        });
    }
    findOne(id) {
        return this.postRepository.findOne(id, {
            relations: ['categories'],
        });
    }
    async preloadCategory(_item) {
        const category = await this.categoryRepository.findOne({
            where: {
                name: _item,
            },
        });
        console.log(category);
        if (category) {
            return category;
        }
        else {
            return this.categoryRepository.create({ name: _item });
        }
    }
    async create(body) {
        const categories = await Promise.all(body.categories.map((_item) => {
            return this.preloadCategory(_item);
        }));
        console.log(categories);
        const post = this.postRepository.create(Object.assign(Object.assign({}, body), { categories }));
        return this.postRepository.save(post);
    }
    async update(id, body) {
        const categories = await Promise.all(body.categories.map((_item) => {
            return this.preloadCategory(_item);
        }));
        const post = await this.postRepository.preload(Object.assign(Object.assign({ id: id }, body), { categories }));
        if (!post) {
            throw new common_1.NotFoundException(`post with id ${id} not found`);
        }
        return this.postRepository.save(post);
    }
    async delete(id) {
        const post = await this.findOne(id);
        this.postRepository.remove(post);
        return post;
    }
    async event(id, type, userId) {
        const queryRunner = this.connection.createQueryRunner();
        let post = await this.findOne(id);
        const events = await this.eventService.getEventByUser(post.id, ref_type_enum_1.RefTypeEnum.Post, userId, event_entity_1.EventTypes.Liked);
        if (events.length > 0) {
            throw new common_1.BadRequestException(`This user already liked this post`);
        }
        console.log('post', post);
        if (type == event_entity_1.EventTypes.Liked) {
            console.log(post.likeCount);
            post.likeCount++;
            console.log(post.likeCount);
        }
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log(post);
            post = await queryRunner.manager.save(post);
            const event = this.eventRepository.create({
                message: type,
                refId: post.id,
                refType: ref_type_enum_1.RefTypeEnum.Post,
            });
            await queryRunner.manager.save(event);
            await queryRunner.commitTransaction();
            return post;
        }
        catch (e) {
            console.log('error');
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MAIL_API')),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(event_entity_1.EventEntity)),
    __param(6, (0, common_1.Inject)(token_constant_1.CURRENCY_SIGN)),
    __param(8, (0, common_1.Inject)(post_config_1.default.KEY)),
    __metadata("design:paramtypes", [String, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection,
        event_service_1.EventService, String, logger_service_1.LoggerService, void 0])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map