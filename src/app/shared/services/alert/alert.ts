import {SafeHtml} from '@angular/platform-browser';

/**
 * Represent a country
 */
export class Alert {
    constructor(
        public msg: string,
        public alertType: string
    ) { }
}

export class PopUpAlert {
    constructor(
        public idName: string,
        public alertType: PopUpAlertType,
        public title: string,
        public setting: PopUpAlertSetting,
    ) { }
}
export interface PopUpAlertType {
     type: string ;
     icon: string ;
     class: string;
     svg?: SafeHtml;
}

export class PopUpAlertSetting implements PopUpAlertSettingInterface {
    constructor(
        public timing: number = 7000,
        public closeButton: boolean = false,
        public block: boolean = false,
        public toDismiss: string = "",
        public message: string = "",
        public alertType: string = 'danger',
    ) { }
}

export interface PopUpAlertSettingInterface {
        timing?: number;
        closeButton?: boolean;
        block?: boolean;
        toDismiss?: string;
        message?: string;
        alertType?: string;
}
