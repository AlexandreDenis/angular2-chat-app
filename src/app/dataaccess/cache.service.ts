import { Injectable } from '@angular/core';

import { User } from './model/user';

const prefixKey: string     = "angular2-chat-app/";
const STORAGE_KEYS = {
    HAS_STORAGE:    prefixKey + "HAS_STORAGE",
    WLOCK:          prefixKey + "WLOCK",
    USERS:          prefixKey + "USERS",
    NEXT_USER_ID:   prefixKey + "NEXT_USER_ID"
}

@Injectable()
export class CacheService {
    storage         = window.localStorage;
    
    users: User[]   = [];

    constructor() {
        // Clear the local storage for debug
        //window.localStorage.clear();

        // init local storage if there isn't already one
        let hasStorage  = this.storage.getItem(STORAGE_KEYS.HAS_STORAGE);

        if(hasStorage !== 'true') {
            console.log("Creation of storage keys...");
            
            this.storage.setItem(STORAGE_KEYS.HAS_STORAGE, "true");
            this.storage.setItem(STORAGE_KEYS.WLOCK, "false");
            this.storage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
            this.storage.setItem(STORAGE_KEYS.NEXT_USER_ID, "0");
        }

        // recovering of the storage
        this.users = JSON.parse(this.storage.getItem(STORAGE_KEYS.USERS));

        let usernames = this.users.map(user => user.username);
        
        console.log("Registered users:", usernames);
    };

    getUsers(): User[] {
        return this.users;
    };
    isUserAlreadyExisting(username: string): boolean {
        let res     = false;

        for(let currUser of this.users) {
            if(currUser.username === username) {
                res     = true;
                break;
            }
        }

        return res;
    };
    createUser(userInfo: User): boolean {
        let res         = false;
        let nextId      = this.storage.getItem(STORAGE_KEYS.NEXT_USER_ID);
        userInfo.id     = +nextId;
        
        let isAlreadyLocked = (this.storage.getItem(STORAGE_KEYS.WLOCK) === 'true');

        if(!isAlreadyLocked) {
            // lock the write on the cache to avoid sync error
            this.storage.setItem(STORAGE_KEYS.WLOCK, 'true');

            this.users.push(userInfo);
            this.storage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));

            // unlock the write on the cache
            this.storage.setItem(STORAGE_KEYS.WLOCK, 'false');

            res         = true;
        } else {
            console.error("Couldn't create user because of cache lock");
        }

        return res
    }
}