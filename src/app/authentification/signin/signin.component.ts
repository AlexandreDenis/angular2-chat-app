import { Component }        from '@angular/core';
import { Router }           from '@angular/router';

import { User }             from '../../dataaccess/model/user';
import { AuthService }      from '../auth.service';
import { ToastService }     from '../../toast/toast.service';
import { ToastType }        from '../../enum';

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
        private router:         Router,
        private authService:    AuthService,
        private toastService:   ToastService
    ) {};

    onSigninButtonClicked() : void {
        if(!this.authService.isUserAlreadyExisting(this.userInfo.username)) {
            // delegate the creation of a user to the AuthService
            if(this.authService.createUser(this.userInfo)) {
                // display a success toast
                this.toastService.requestToastDisplay(
                    "Registration succeeded",
                    ToastType.INFO
                );

                this.router.navigate(['/login']);
            } else {
                // display an error toast
                this.toastService.requestToastDisplay(
                    "Registration failed",
                    ToastType.ERROR
                );
            }
        } else {
            // display an error toast
            this.toastService.requestToastDisplay(
                "Registration failed: '" + this.userInfo.username + "' user already exists",
                ToastType.ERROR
            );
        }
    };
}