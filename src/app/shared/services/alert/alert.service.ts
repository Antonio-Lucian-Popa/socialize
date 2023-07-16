import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Alert, PopUpAlert, PopUpAlertSetting, PopUpAlertSettingInterface, PopUpAlertType} from './alert';

// this is imported by services and components that require alerts
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  readonly subject = new Subject<Alert>();
  public alert$ = this.subject.asObservable();


  readonly popUpSubject$ = new Subject<PopUpAlert>();
  readonly clouseAllert$ = new Subject<string>();
  readonly allerTypeArray = [
    {type: 'danger',
     icon: 'danger.svg',
     class: 'danger-icon'},
    {type: 'warning',
    icon: 'priority_high.svg',
    class: 'warning-icon',
    svg: null},
    {type: 'working',
    icon: 'working.svg',
    class: 'working-icon',
    svg: null},
    {type: 'done',
    icon: 'check.svg',
    class: 'done-icon',
    svg: null},
    {type: 'info',
    icon: 'priority_high.svg',
    class: 'info-icon',
    svg: null}
  ] as PopUpAlertType[];
  constructor() {
  }


  send(msg: string, alertType = 'danger') {
    this.subject.next(new Alert(msg, alertType));
  }
    /**
   * Open allert on top rigth,
   * - id --> id of aller, you can't open 2 alert whit same id
   * - title -> title of allerti in
   * - setting :
   *          timing: number = 7000, --> timing open --> if you set this at -1, the alert not have timing
   *          closeButton: boolean = false, --> clouse button present
   *           block: boolean = false, --> you can set it true for blog user and page whit black backcraund
   *           toDismiss: string = null, --> you can set id of one alert present to thismiss when your alert is creating
   *           message: string = null, --> message of alert
   *           alertType: string = 'danger', --> type of alert you wont open
   *            - type of alert: danger, warnig, working, done, info
   * */
  openPopUpAlert(idPop: string, title: string , setting: PopUpAlertSettingInterface  = new PopUpAlertSetting()) {
    const settingNotify = Object.assign(new PopUpAlertSetting(), setting);
      const alerTypeFind = this.allerTypeArray.find(ele => ele.type === settingNotify.alertType);
      if (!!alerTypeFind) {
        this.popUpSubject$.next(new PopUpAlert(idPop, alerTypeFind,  title, settingNotify) );
      } else {
        this.openPopUpAlert('error input type', 'Error Type', {message: 'You have insert a not correct alert type'}  );
      }
  }
  closePopUpAlert(id: string) {
    this.clouseAllert$.next(id);
  }
}
