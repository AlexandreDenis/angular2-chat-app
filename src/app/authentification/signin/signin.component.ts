import { Component, 
         OnInit }                   from '@angular/core';
import { Router }                   from '@angular/router';
import { FormGroup,
         FormControl,
         Validators }               from '@angular/forms';

import { User }                     from '../../dataaccess/model/user';
import { AuthService }              from '../auth.service';
import { ToastService }             from '../../toast/toast.service';
import { ToastType }                from '../../enum';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        private router:         Router,
        private authService:    AuthService,
        private toastService:   ToastService
    ) {};

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            'firstNameInput': new FormControl(null, [
                Validators.required,
                Validators.maxLength(32),
                Validators.pattern(new RegExp("^[a-zA-Z]+$"))
            ]),
            'lastNameInput': new FormControl(null, [
                Validators.required,
                Validators.maxLength(32),
                Validators.pattern(new RegExp("^[a-zA-Z]+$"))
            ]),
            'usernameInput': new FormControl(null, [
                Validators.required,
                Validators.maxLength(16),
                Validators.pattern(new RegExp("^[a-zA-Z0-9]+$"))
            ]),
            'passwordInput': new FormControl(null, [
                Validators.required,
                Validators.maxLength(64)
            ])
        });
    };

    // getters
    get firstNameInput()    {  return this.formGroup.get('firstNameInput'); }
    get lastNameInput()     {  return this.formGroup.get('lastNameInput');  }
    get usernameInput()     {  return this.formGroup.get('usernameInput');  }
    get passwordInput()     {  return this.formGroup.get('passwordInput');  }

    onSigninButtonClicked() : void {
        // generate the User instance from the form values
        let userInfo: User = {
            id:         -1,
            firstName:  this.firstNameInput.value,
            lastName:   this.lastNameInput.value,
            username:   this.usernameInput.value,
            password:   this.passwordInput.value
        };
        // check if user not already exists
        if(!this.authService.isUserAlreadyExisting(userInfo.username)) {
            // delegate the creation of a user to the AuthService
            if(this.authService.createUser(userInfo)) {
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
                "Registration failed: '" + userInfo.username + "' user already exists",
                ToastType.ERROR
            );
        }
    };
}