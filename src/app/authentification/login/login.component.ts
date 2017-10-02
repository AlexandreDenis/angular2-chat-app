import { Component,
         OnInit }           from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }       from '@angular/forms';

import { CacheService }     from '../../dataaccess/cache.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    formGroup: FormGroup;

    constructor(
        private cache: CacheService
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
        // TODO
        console.log("Authentication requested");

        console.log("username", this.usernameInput.value);
        console.log("password", this.passwordInput.value);
    };
}