import { EncryptionService }    from '../../authentification/encryption.service';

describe('EncryptionService', function() {
    let encryptionService:  EncryptionService;

    beforeEach(() => {
        encryptionService   = new EncryptionService();
    });

    it('should encrypt string', function() {
        let a = "test";
        let b = encryptionService.encrypt(a);

        expect(b).not.toBeNull();
        expect(a).not.toEqual(b);
    });

    it('should always give the same output for a specific input', function() {
        let input   = "test";
        let output1 = encryptionService.encrypt(input);
        let output2 = encryptionService.encrypt(input);

        expect(output1).not.toBeNull;
        expect(output1).toEqual(output2);
    });
});