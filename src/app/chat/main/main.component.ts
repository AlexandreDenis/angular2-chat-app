import { Component,
         OnInit }       from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }   from '@angular/forms';

import { Messenger }    from '../messenger.service';
import { ToastService } from '../../toast/toast.service';

import { ToastType }    from '../../enum';

@Component({
  selector: 'main',
  templateUrl: './main.component.html'
})
export class MainComponent {
    formGroup:  FormGroup;
    maxSize:    number      = 64;   // max size for messages

    constructor(
        private messenger:      Messenger,
        private toastService:   ToastService
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
}
