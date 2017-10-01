import { Injectable }       from '@angular/core';

import { ToastType }        from '../enum';
import { ToastInfo }        from './toast.component';

import { Subject }          from 'rxjs/Subject';

@Injectable()
export class ToastService {
    displayMessageRequested = new Subject();

    requestToastDisplay(msg: string, type: ToastType) {
        let info: ToastInfo = { 
            message: msg,
            type: type
        };
        this.displayMessageRequested.next(info);
    };
}