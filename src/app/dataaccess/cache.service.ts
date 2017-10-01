import { Injectable } from '@angular/core';

import { User } from './model/user';

const prefixKey: string     = "angular2-chat-app/";
const STORAGE_KEYS = {
    HAS_STORAGE:    prefixKey + "HAS_STORAGE",
    USERS:          prefixKey + "USERS"
}

@Injectable()
export class CacheService {
    storage         = window.localStorage;
    
    users: User[]   = [];

    constructor() {
        // init local storage if there isn't already one
        var hasStorage  = this.storage.getItem(STORAGE_KEYS.HAS_STORAGE);
        if(!hasStorage) {
            console.log("Creation of storage keys...");
            
            this.storage.setItem(STORAGE_KEYS.HAS_STORAGE, "true");
            let test: User[] = [
                {
                    id: 1,
                    name: "Test",
                    password: "Test_password"
                }
            ]
            this.storage.setItem(STORAGE_KEYS.USERS, JSON.stringify(test));
        }

        // recovering of the storage
        this.users = JSON.parse(this.storage.getItem(STORAGE_KEYS.USERS));

        console.log("users", this.users);
    }
}