import { Component,
         OnInit }       from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }   from '@angular/forms';
import { Router }       from '@angular/router';

import { Messenger }    from '../messenger.service';
import { ToastService } from '../../toast/toast.service';
import { AuthService }  from '../../authentification/auth.service';

import { ToastType }    from '../../enum';

@Component({
  selector: 'main',
  templateUrl: './main.component.html'
})
export class MainComponent {

    formGroup:  FormGroup;
    maxSize:    number      = 128;   // max size for messages

    constructor(
        private messenger:      Messenger,
        private toastService:   ToastService,
        private authService:    AuthService,
        private router:         Router
    ) {};

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            'messageInput': new FormControl(null, [
                Validators.required,
                Validators.maxLength(this.maxSize)
            ])
        });
    };

    // getters
    get messageInput()      {   return this.formGroup.get('messageInput');  }

    onSendButtonClicked() {
        let message     = this.messageInput.value;
        if(this.messenger.Send(message)) {
            // empty the message field
            this.messageInput.setValue("");
        } else {
            // display an error toast
            this.toastService.requestToastDisplay(
                "Unable to send the message",
                ToastType.ERROR
            );
        }
    };

    onLogoutButtonClicked() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    };
}
