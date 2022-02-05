import { TranslateFieldsEnum, TranslateService } from 'src/translate/translate.service';
import { TextfieldsService } from './textfields.service';
export declare class TextfieldsController {
    private readonly textfieldsService;
    private readonly translateService;
    constructor(textfieldsService: TextfieldsService, translateService: TranslateService);
    getField(field: TranslateFieldsEnum): string;
}
