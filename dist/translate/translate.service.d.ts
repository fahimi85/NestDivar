import { Request } from 'express';
export declare enum TranslateFieldsEnum {
    Banner = "Banner"
}
export declare class TranslateService {
    private readonly request;
    constructor(request: Request);
    translate(field: TranslateFieldsEnum): string;
}
