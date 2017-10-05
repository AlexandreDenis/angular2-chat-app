import { Injectable }           from '@angular/core';

import { CacheService }         from '../dataaccess/cache.service';
import { AuthService }          from '../authentification/auth.service';

import { Message }              from '../dataaccess/model/message';

@Injectable()
export class Messenger {
    constructor(
        private cache:          CacheService,
        private authService:    AuthService
    ) {};

    Send(msg: string) {
        if(this.authService.isLogged()) {
            // create a Message instance
            let newMsg: Message = {
                idUser:     this.authService.getCurrentUserId(),
                timestamp:  Date.now(),
                text:       msg   
            };
            return this.cache.sendMessage(newMsg);
        }

        return false;
    };
}