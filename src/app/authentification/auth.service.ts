import { Injectable }           from '@angular/core';

import { User }                 from '../dataaccess/model/user';
import { CacheService }         from '../dataaccess/cache.service';
import { EncryptionService }    from './encryption.service';

@Injectable()
export class AuthService {
    constructor(
        private cache: CacheService,
        private encryption: EncryptionService
    ) {};

    isUserAlreadyExisting(username: string): boolean {
        return this.cache.isUserAlreadyExisting(username);
    };

    createUser(userInfo: User) {
        // encrypt the password
        userInfo.password   = this.encryption.encrypt(userInfo.password);

        return this.cache.createUser(userInfo);
    };
}