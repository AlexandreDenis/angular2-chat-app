import { Component }    from '@angular/core';

import { User }         from '../../dataaccess/model/user';   
import { AuthService }  from '../auth.service';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    userInfo: User = {
        id: -1,
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    };

    constructor(
        private authService: AuthService
    ) {
        
    };

    onSigninButtonClicked() : void {
        console.log("Registration requested");

        if(!this.authService.isUserAlreadyExisting(this.userInfo.username)) {
            this.authService.createUser(this.userInfo);
        } else {
            // TODO: handle the error
        }
    };
}