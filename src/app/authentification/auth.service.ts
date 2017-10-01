import { Injectable }       from '@angular/core';

import { User }             from '../dataaccess/model/user';
import { CacheService}      from '../dataaccess/cache.service';

@Injectable()
export class AuthService {
    constructor(
        private cache: CacheService
    ) {};

    isUserAlreadyExisting(username: string): boolean {
        return this.cache.isUserAlreadyExisting(username);
    };

    createUser(userInfo: User) {
        return this.cache.createUser(userInfo);
    };
}