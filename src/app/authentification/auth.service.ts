import { Injectable }           from '@angular/core';

import { User }                 from '../dataaccess/model/user';
import { CacheService }         from '../dataaccess/cache.service';
import { EncryptionService }    from './encryption.service';

@Injectable()
export class AuthService {
    isLoggedIn  = false;

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

        // ask cache saving
        return this.cache.createUser(userInfo);
    };

    tryLogin(username: string, password: string) {
        this.isLoggedIn     = false;
        let user            = this.cache.getUser(username);

        if(user != undefined) {
            let encryptedPwd    = this.encryption.encrypt(password);
            if(user.password == encryptedPwd) {
                this.isLoggedIn     = true;
            }
        }

        return this.isLoggedIn;
    };

    logout(){
        this.isLoggedIn     = false;
    }
} 