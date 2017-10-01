import { Component }        from '@angular/core';

import { ToastService }     from './toast.service';
import { ToastType }        from '../enum';

export class ToastInfo {
    message:    string;
    type:       ToastType;
}

@Component({
    selector: 'toast',
    templateUrl: './toast.component.html',
    styleUrls: [ './toast.component.css' ]
})
export class ToastComponent {
    showToast           = false;
    info:ToastInfo      = {
        message:    '',
        type:       ToastType.INFO
    }

    constructor(
        private toastService: ToastService
    ) {
        toastService.displayMessageRequested.subscribe(value => this.showMessage(value as ToastInfo));
    }

    showMessage(value: ToastInfo): void {
        this.info       = value;
        
        this.showToast  = true;
        setTimeout(() => this.showToast = false, 3000);
    };

    isInfoMessage(): boolean {
        return (this.info.type === ToastType.INFO);
    };

    isErrorMessage(): boolean {
        return (this.info.type === ToastType.ERROR);
    };
}