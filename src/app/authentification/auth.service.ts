import { Injectable }           from '@angular/core';

import { User }                 from '../dataaccess/model/user';
import { CacheService }         from '../dataaccess/cache.service';
import { EncryptionService }    from './encryption.service';

@Injectable()
export class AuthService {
    private isLoggedIn:boolean  = false;
    private idUser: number      = -1;

    constructor(
        private cache: CacheService,
        private encryption: EncryptionService
    ) {};

    isUserAlreadyExisting(username: string): boolean {
        return this.cache.isUserAlreadyExisting(username);
    };

    createUser(userInfo: User): boolean {
        if(this.isUserAlreadyExisting(userInfo.username))
            return false;

        // encrypt the password
        userInfo.password   = this.encryption.encrypt(userInfo.password);

        // ask cache saving
        return this.cache.createUser(userInfo);
    };

    tryLogin(username: string, password: string) {
        this.isLoggedIn     = false;
        this.idUser         = -1;
        
        let user            = this.cache.getUserFromName(username);

        if(user != undefined) {
            let encryptedPwd    = this.encryption.encrypt(password);
            if(user.password == encryptedPwd) {
                console.log("SUCCESS");
                this.isLoggedIn     = true;
                this.idUser         = user.id;
            }
        }

        return this.isLoggedIn;
    };

    logout(){
        this.isLoggedIn     = false;
        this.idUser         = -1;
    };

    isLogged(): boolean {
        return this.isLoggedIn;
    }

    getCurrentUserId(): number {
        return this.idUser;
    };
} 