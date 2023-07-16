import {animate, style, transition, trigger} from '@angular/animations';
import {Component, Input, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {Alert, PopUpAlert} from './alert';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertFro', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1}),
        animate('0.3s cubic-bezier(.8, -0.6, 0.2, 1.5)',
         style({
           transform: 'scale(0.5)', opacity: 0
         }))
      ])
    ]),
  ]
})
export class AlertComponent implements OnInit {

  // This is a simple component
  // evaluate an ng-template to enable custom actions
  // also a global variant to enable multiple alerts

  @Input() alert: Alert | undefined;
  @Input() alertType!: string;
  blockAll = false;
  popUpAlertArray: Array<PopUpAlert> = [];
  canDismissMore = false;
  constructor(readonly alertService: AlertService) {
  }

  closeAlert() {
    this.alert = undefined;
  }

  ngOnInit(): void {
    this.popUpAlertArray = [];
    this.alertService.alert$.subscribe(alert => {
      this.alert = alert;
    });
    this.alertService.popUpSubject$.subscribe(popUpAlertResult => {
      this.popUpArryaController(popUpAlertResult);
    });
    this.alertService.clouseAllert$.subscribe(idToDismiss => {
      this.dismissElement(idToDismiss);
    });
  }

  async popUpArryaController(popUpAlert: PopUpAlert) {
    if (this.popUpAlertArray.findIndex(alert => alert.idName === popUpAlert.idName ) === -1 ) {
    forkJoin([
      this.pushInArray(popUpAlert),
      this.dismissFromElement(popUpAlert),
      this.trimAlert(popUpAlert),
    ]);
    } else {
      this.dismissElement('error to create');
      this.alertService.openPopUpAlert('error to create', 'Error ID', {message:  'You can not create a notify with same id'});
    }
  }

  dismissElement(popUpAlertID: string) {
    const popUpAlertToDismiss = this.popUpAlertArray.find(popUpAlert => popUpAlert.idName === popUpAlertID);
    if (!!popUpAlertToDismiss) {
        this.popUpAlertArray.splice(this.popUpAlertArray.indexOf(popUpAlertToDismiss), 1);
        this.checkBLockPage();
    }
  }
  trimAlert(popUpAlert: PopUpAlert) {
    if ( popUpAlert.setting.timing > 0) {
      this.delay(popUpAlert.setting.timing).then(elem => {
        this.dismissElement(popUpAlert.idName);
      });
    }
  }
  pushInArray(popUpAlert: PopUpAlert) {
    this.popUpAlertArray.push(popUpAlert);
    this.checkBLockPage();
  }
  dismissFromElement(popUpAlert: PopUpAlert) {
    if (!!popUpAlert.setting.toDismiss) {
      this.dismissElement(popUpAlert.setting.toDismiss);
    }
  }
    delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  checkBLockPage() {
      this.blockAll = !!this.popUpAlertArray.find(alertElem => alertElem.setting.block);
  }
}
