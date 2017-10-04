import { Component,
         OnInit }       from '@angular/core';

import { Message }      from '../../dataaccess/model/message';

import { CacheService } from '../../dataaccess/cache.service';
import { AuthService }  from '../../authentification/auth.service';

import { timeConverter }    from '../../lib';

@Component({
  selector: 'message-box',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageBoxComponent implements OnInit {
    messages:   Message[]   = [];

    constructor(
        private cache:          CacheService,
        private authService:    AuthService
    ) {};

    ngOnInit(): void {
        // recover the messages from the cache
        this.messages   = this.cache.getMessages();
    };

    fromCurrentUser(idUser): boolean {
        return (idUser == this.authService.getCurrentUserId());
    };

    getUsername(idUser): string {
        let username = "";

        let user = this.cache.getUser(idUser);
        if(user != undefined) {
            username    = user.username;
        }

        return username;
    };

    displayDateFromTimestamp(timestamp): string {
        return timeConverter(timestamp);
    };

    switchShowDate(msg) {
        if(msg.showDate == undefined) {
            msg.showDate = true;
        } else {
            msg.showDate = !msg.showDate;
        }
    };
}
