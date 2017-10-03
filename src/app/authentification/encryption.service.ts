import { Injectable }       from '@angular/core';

import { SHA256, enc }      from 'crypto-js';

@Injectable()
export class EncryptionService {
    encrypt(word: string): string {
        let hash    = SHA256(word);
        return hash.toString(enc.Base64);
    };
}