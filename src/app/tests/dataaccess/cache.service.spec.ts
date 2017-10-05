import { CacheService }         from '../../dataaccess/cache.service';
import { EncryptionService }    from '../../authentification/encryption.service';
import { AuthService }          from '../../authentification/auth.service';
import { Messenger }            from '../../chat/messenger.service';

import { User }                 from '../../dataaccess/model/user';
import { Message }              from '../../dataaccess/model/message';

describe('CacheService', function() {
    let cache:              CacheService;
    let encryptionService:  EncryptionService;
    let authService:        AuthService;
    let messenger:          Messenger;

    beforeEach(function() {
        // clear the cache
        localStorage.clear();

        cache               = new CacheService();
        encryptionService   = new EncryptionService();
        authService         = new AuthService(cache, encryptionService);
        messenger           = new Messenger(cache, authService);
    });

    function createUser(firstName:string, lastName:string, username:string, password:string): boolean {
        let user: User  = {
            id:             -1,
            firstName:      firstName,
            lastName:       lastName,
            username:       username,
            password:       password
        }
        return authService.createUser(user);
    }

    function createMessage(idUser:number, timestamp:number, text:string) {
        let msg: Message    = {
            idUser:     idUser,
            timestamp:  timestamp,
            text:       text
        };
        return cache.sendMessage(msg);
    }

    it("should store and returns the list of users", function() {
        let success = false;
        success = createUser('user1','user1','user1','user1');
        expect(success).toBeTruthy();
        success = createUser('user2','user2','user2','user2');
        expect(success).toBeTruthy();
        success = createUser('user3','user3','user3','user3');
        expect(success).toBeTruthy();

        // check if there are 3 users in the cache
        let users   = cache.getUsers();
        let nbUsers = users.length;
        expect(nbUsers).toEqual(3);
        if(nbUsers > 2) {
            // verify the consistency of the users in the cache
            expect(users[0].username).toEqual("user1");
            expect(users[1].username).toEqual("user2");
            expect(users[2].username).toEqual("user3");
        }
    });

    it("should store and returns the list of messages", function() {
        let success = false;

        // create a user
        success = createUser('user1','user1','user1','user1');
        expect(success).toBeTruthy();

        // log in
        success = authService.tryLogin("user1", "user1");
        expect(success).toBeTruthy();

        // send 3 different messages
        if(authService.isLogged()) {
            let idUser  = authService.getCurrentUserId();
            createMessage(idUser, Date.now(), "message 1");
            createMessage(idUser, Date.now(), "message 2");
            createMessage(idUser, Date.now(), "message 3");

            // check if there are 3 messages in the cache
            let messages    = cache.getMessages();
            let nbMessages  = messages.length;
            expect(nbMessages).toEqual(3);
            if(nbMessages > 2) {
                // verify the consistency of the messages in the cache
                expect(messages[0].text).toEqual("message 1");
                expect(messages[1].text).toEqual("message 2");
                expect(messages[2].text).toEqual("message 3");
            }
        }
    });
});