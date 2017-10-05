import { CacheService }         from '../../dataaccess/cache.service';
import { EncryptionService }    from '../../authentification/encryption.service';
import { AuthService }          from '../../authentification/auth.service';

import { User }                 from '../../dataaccess/model/user';

// clear the cache
localStorage.clear();

describe('AuthService', function() {
    let cache:              CacheService;
    let encryptionService:  EncryptionService;
    let authService:        AuthService;
    
    let password:           string              = "mypassword";
    let idUser:             number              = -1;

    beforeAll(() => {
        cache               = new CacheService();
        encryptionService   = new EncryptionService();
        authService         = new AuthService(cache, encryptionService);
    });

    it('should create a user', function() {
        let newUser:    User    = {
            id:         -1,
            firstName: "Alexandre",
            lastName:  "Denis",
            username:  "alec",
            password:  password
        };

        // the creation returns true
        let success: boolean    = authService.createUser(newUser);
        expect(success).toBeTruthy();

        // the user can be recovered from the cache
        let user: User          = cache.getUserFromName(newUser.username);
        expect(user).not.toBeUndefined();

        // the id of the user has been set
        expect(user.id).toBeGreaterThanOrEqual(0);

        // the password of the new user as been encrypted
        let encryptedPwd        = encryptionService.encrypt(password);
        expect(user.password).toEqual(encryptedPwd);

        idUser                  = user.id;
    });

    it('should not create a user with an already-existing username', function() {
        // try to create a second user with the same username
        let newUser:    User    = {
            id:         -1,
            firstName: "Alec",
            lastName:  "Dupont",
            username:  "alec",
            password:  "test"
        };

        // the creation returns false
        let success             = authService.createUser(newUser);
        expect(success).toBeFalsy();

        // the user has not been added to the cache
        let user: User          = cache.getUserFromName(newUser.username);
        expect(newUser.firstName).not.toEqual(user.firstName);
    });

    it('should be able to check whether a user is existing', function() {
        let res1    = authService.isUserAlreadyExisting("alec");
        let res2    = authService.isUserAlreadyExisting("toto");

        expect(res1).toBeTruthy();
        expect(res2).toBeFalsy();
    });

    it('should allow users to log in', function() {
        let res     = authService.tryLogin("alec", password);
        
        // the tryLogin() method returned true
        expect(res).toBeTruthy();

        // the isLoggedIn attribute has been updated in consequence
        expect(authService.isLogged()).toBeTruthy();

        // the idUser attribute has been updated in consequence
        expect(authService.getCurrentUserId()).toBeGreaterThanOrEqual(0);

        // the idUser is the one of the user "alec"
        expect(authService.getCurrentUserId()).toEqual(idUser);
    });

    it('should allow users to log out', function() {
        authService.logout();

        // the isLoggedIn attribute has been updated in consequence
        expect(authService.isLogged()).toBeFalsy();
        
        // the idUser attribute has been updated in consequence
        expect(authService.getCurrentUserId()).toBeLessThan(0);
    });

    it('should failed to log in user with bad password for existing username', function() {
        let wrongPwd    = "wrongpassword";
        let res         = authService.tryLogin("alec", wrongPwd);

        // the tryLogin() method returned false
        expect(res).toBeFalsy();

        // the isLoggedIn attribute has been updated in consequence
        expect(authService.isLogged()).toBeFalsy();
        
        // the idUser attribute has been updated in consequence
        expect(authService.getCurrentUserId()).toBeLessThan(0);
    });

    it("should failed to log in user with unexisting username", function() {
        let wrongUsername   = "toto";
        let res             = authService.tryLogin(wrongUsername, password);

        // the tryLogin() method returned false
        expect(res).toBeFalsy();

        // the isLoggedIn attribute has been updated in consequence
        expect(authService.isLogged()).toBeFalsy();
        
        // the idUser attribute has been updated in consequence
        expect(authService.getCurrentUserId()).toBeLessThan(0);
    });
});