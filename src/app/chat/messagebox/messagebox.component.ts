import { Component,
         OnInit,
         AfterViewChecked,
         ViewChild,
         ElementRef }           from '@angular/core';

import { Message }              from '../../dataaccess/model/message';

import { CacheService }         from '../../dataaccess/cache.service';
import { AuthService }          from '../../authentification/auth.service';

import { timeConverter }        from '../../lib';

@Component({
  selector: 'message-box',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageBoxComponent implements OnInit, AfterViewChecked {
    @ViewChild('messagebox') messagebox: ElementRef;

    messages:   Message[]   = [];

    constructor(
        private cache:          CacheService,
        private authService:    AuthService
    ) {};

    ngOnInit(): void {
        // recover the messages from the cache
        this.messages   = this.cache.getMessages();

        // scroll down when new message to display
        this.cache.newMessageReceived.subscribe(() => this.scrollDown());
    };

    ngAfterViewChecked(): void {
        this.scrollDown();
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

    scrollDown() {
        var elem =  this.messagebox;
        var height = elem.nativeElement.scrollHeight;
        elem.nativeElement.scrollTop = height;
    };
}
