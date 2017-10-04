import { Injectable }   from '@angular/core';

import { User }         from './model/user';
import { Message }      from './model/message';

import { addEvent }     from '../lib';

const prefixKey: string     = "angular2-chat-app/";
const STORAGE_KEYS = {
    HAS_STORAGE:    prefixKey + "HAS_STORAGE",
    WLOCK:          prefixKey + "WLOCK",
    USERS:          prefixKey + "USERS",
    NEXT_USER_ID:   prefixKey + "NEXT_USER_ID",
    MESSAGES:       prefixKey + "MESSAGES"
}

@Injectable()
export class CacheService {
    storage         = window.localStorage;
    
    users:      User[]      = [];
    messages:   Message[]   = [];

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
            this.storage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
        }

        // recovering of the storage
        this.users      = JSON.parse(this.storage.getItem(STORAGE_KEYS.USERS));
        this.messages   = JSON.parse(this.storage.getItem(STORAGE_KEYS.MESSAGES));

        //let usernames = this.users.map(user => user.username);
        //console.log("Registered users:", this.users);

        // add listener to detect cache modifications
        addEvent(window, 'storage', (event) => {
            let newValue    = JSON.parse(event.newValue);

            switch(event.key) {
                case STORAGE_KEYS.USERS: {
                    console.log("sync users");

                    let cnt         = newValue.length;
                    if(newValue != undefined && cnt > 0) {
                        let newUser = newValue[cnt - 1];
                        this.users.push(newUser);
                    }
                    break;
                }
                case STORAGE_KEYS.MESSAGES: {
                    console.log("sync messages");

                    let cnt         = newValue.length;
                    if(newValue != undefined && cnt > 0) {
                        let newMsg = newValue[cnt - 1];
                        this.messages.push(newMsg);
                        console.log(this.messages);
                    }
                    break;
                }
            }
        });
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

            // update the next user ID
            this.storage.setItem(STORAGE_KEYS.NEXT_USER_ID, ""+(userInfo.id+1));

            // unlock the write on the cache
            this.storage.setItem(STORAGE_KEYS.WLOCK, 'false');

            res         = true;
        } else {
            console.error("Couldn't create user because of cache lock");
        }

        return res
    };
    getUser(username: string): User{
        let user:User = null;

        for(let currUser of this.users) {
            if(currUser.username === username) {
                user    = currUser;
                break;
            }
        }

        return user;
    };
    sendMessage(msg: Message) {
        let success = false;
        let isAlreadyLocked = (this.storage.getItem(STORAGE_KEYS.WLOCK) === 'true');

        if(!isAlreadyLocked) {
            this.messages.push(msg);
            this.storage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(this.messages));
            console.log(this.messages);
            success = true;
        } else {
            console.error("Couldn't send message because of cache lock");
        }

        return success;
    };
}