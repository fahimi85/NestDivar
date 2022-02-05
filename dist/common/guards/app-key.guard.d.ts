import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppKeyService } from 'src/app-key/app-key.service';
export declare class AppKeyGuard implements CanActivate {
    private readonly appKeyService;
    private readonly reflector;
    constructor(appKeyService: AppKeyService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
