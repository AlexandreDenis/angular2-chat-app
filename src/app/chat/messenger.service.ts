import { Injectable }           from '@angular/core';

import { CacheService }         from '../dataaccess/cache.service';

@Injectable()
export class Messenger {
    constructor(
        private cache: CacheService
    ) {};

    Send(msg: string) {
        this.cache.sendMessage(msg);
    };
} 