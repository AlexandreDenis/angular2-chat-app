import { Component }    from '@angular/core';

import { CacheService }     from '../../dataaccess/cache.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials = {
        username: '',
        password: ''
    };

    constructor(
        private cache: CacheService
    ) {

    }

    onLoginButtonClicked(): void {
        // TODO
        console.log("Authentication requested");

        console.log("username", this.credentials.username);
        console.log("password", this.credentials.password);
    };
}