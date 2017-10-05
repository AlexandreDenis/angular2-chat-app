import { CacheService }         from '../../dataaccess/cache.service';
import { EncryptionService }    from '../../authentification/encryption.service';
import { AuthService }          from '../../authentification/auth.service';
import { Messenger }            from '../../chat/messenger.service';

import { User }                 from '../../dataaccess/model/user';
import { Message }              from '../../dataaccess/model/message';

describe('Messenger', function() {
    let cache:              CacheService;
    let encryptionService:  EncryptionService;
    let authService:        AuthService;
    let messenger:          Messenger;

    beforeAll(function() {
        cache               = new CacheService();
        encryptionService   = new EncryptionService();
        authService         = new AuthService(cache, encryptionService);
        messenger           = new Messenger(cache, authService);
    });

    beforeEach(function() {
        // clear the cache
        localStorage.clear();
        
        authService.logout();
    });

    it("should send message", function() {
        // first, create a user
        let password        = 'test';
        let newUser: User   = {
            id:             -1,
            firstName:      'test',
            lastName:       'test',
            username:       'test',
            password:       password
        };
        let userCreated = authService.createUser(newUser);
        expect(userCreated).toBeTruthy();

        // secondly, login with the new user credentials
        let loggedIn: boolean   = authService.tryLogin(newUser.username, password);
        expect(loggedIn).toBeTruthy();

        // then, try to send a message
        let msgString: string   = "this is a message";
        let success: boolean    = messenger.Send(msgString);

        // the sending returns true
        expect(success).toBeTruthy();

        // the message has been added to the cache
        let messages    = cache.getMessages();
        let nbMessages  = messages.length;
        expect(nbMessages).toBeGreaterThan(0);
        if(nbMessages > 0) {
            expect(messages[nbMessages - 1].text).toEqual(msgString);
        }
    });

    it("should forbid to send message if not logged in", function() {
        let msgString: string   = "this is another message";
        let success = messenger.Send(msgString);

        // the sending returns false
        expect(success).toBeFalsy();

        // the message has not been added to the cache
        let messages    = cache.getMessages();
        let nbMessages  = messages.length;
        if(nbMessages > 0)
            expect(messages[nbMessages - 1].text).not.toEqual(msgString);
    });
});