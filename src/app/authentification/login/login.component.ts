import { Component,
         OnInit }           from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }       from '@angular/forms';
import { Router }           from '@angular/router';

import { CacheService }     from '../../dataaccess/cache.service';
import { AuthService }      from '../auth.service';
import { ToastService }     from '../../toast/toast.service';
import { ToastType }        from '../../enum';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    formGroup: FormGroup;

    constructor(
        private cache:          CacheService,
        private authService:    AuthService,
        private toastService:   ToastService,
        private router:         Router
    ) {}

    ngOnInit(): void {
        this.formGroup = new FormGroup({
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
    get usernameInput()     {  return this.formGroup.get('usernameInput');  }
    get passwordInput()     {  return this.formGroup.get('passwordInput');  }

    onLoginButtonClicked(): void {
        console.log("Authentication requested");

        let username    = this.usernameInput.value,
            password    = this.passwordInput.value;
        // try to login
        if(this.authService.tryLogin(username,password)) {
            // display a success toast
            this.toastService.requestToastDisplay(
                "Connexion succeeded",
                ToastType.INFO
            );

            // open the chat
            this.router.navigate(['/main']);
        } else {
            // display an error toast
            this.toastService.requestToastDisplay(
                "Connexion failed: bad login/password",
                ToastType.ERROR
            );
        }
    };
}