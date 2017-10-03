import { Component }    from '@angular/core';

import { Messenger }    from '../messenger.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html'
})
export class MainComponent {
    counter = 0;

    constructor(
        private messenger:  Messenger
    ) {};

    onButtonClicked() {
        this.messenger.Send("Message " + this.counter);
        ++this.counter;
    };
}
