import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { PopUpAlert, PopUpAlertSetting, PopUpAlertType } from './alert';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  const mockTypeAlert: PopUpAlertType = {
    type: 'danger',
    icon: 'danger.svg',
    class: 'danger-icon',
    svg: '',
  };
  const stingMock = new PopUpAlertSetting();
  const alertMock = new PopUpAlert(
    'test1',
    mockTypeAlert,
    ' test title',
    stingMock
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call send with only one parameter', () => {
    service.alert$.subscribe((alert) => {
      expect(alert.msg).toBe('message');
      expect(alert.alertType).toBe('danger');
    });
    service.send('message');
  });

  it('should call send with two parameters', () => {
    service.alert$.subscribe((alert) => {
      expect(alert.msg).toBe('message');
      expect(alert.alertType).toBe('success');
    });
    service.send('message', 'success');
  });

  it('should create a notify without settings', () => {
    service.popUpSubject$.subscribe((el) => {
      expect(el.setting.alertType).toBe('danger');
    });
    service.openPopUpAlert(alertMock.idName, alertMock.title);
  });

  it('alert Service Create a notify With not Corret Type', () => {
    service.popUpSubject$.subscribe((el) => {
      expect(el.idName).toEqual('error input type');
    });
    service.openPopUpAlert('pippo', 'pippo mess', { alertType: 'ico' });
  });

  it('alert Service dismiss notify', () => {
    service.clouseAllert$.subscribe((idName) => {
      expect(idName).toEqual('pippo');
    });
    service.closePopUpAlert('pippo');
  });
});