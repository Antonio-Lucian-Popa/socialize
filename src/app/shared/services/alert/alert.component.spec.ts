import {configureTestSuite} from 'ng-bullet';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AlertComponent} from './alert.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AlertService} from './alert.service';
import {PopUpAlert, PopUpAlertSetting, PopUpAlertType} from './alert';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let originalTimeout;
  const mockTypeAlert = {type: 'danger',
  icon: 'danger.svg',
  class: 'danger-icon'} as PopUpAlertType;
  const arryaToNofity: Array<PopUpAlert> = [
  new PopUpAlert('test1', mockTypeAlert,  'title test 1', new PopUpAlertSetting() ),
  new PopUpAlert('test2', mockTypeAlert,  'title test 2', new PopUpAlertSetting(-1 , false, false, 'test1')),
  new PopUpAlert('test3', mockTypeAlert,  'title test 3', new PopUpAlertSetting(-1 , false, true)),
  new PopUpAlert('test4', mockTypeAlert,  'title test 4', new PopUpAlertSetting(-1 , false, true)),
  new PopUpAlert('test5', mockTypeAlert,  'title test 5', new PopUpAlertSetting(-1 , false, false, 'test3')),
  new PopUpAlert('test6', mockTypeAlert,  'title test 6', new PopUpAlertSetting(-1 , false, false, 'test4')),
  new PopUpAlert('test7', mockTypeAlert,  'title test 7', new PopUpAlertSetting(1000)),
  new PopUpAlert('test8', mockTypeAlert,  'title test 6', new PopUpAlertSetting(-1 , false, false, 'test4')),
  ];
  let alertService: AlertService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AlertService, useValue: {
            openPopUpAlert: () => {},
            closePopUpAlert: () => {},
            alert$: of(null),
            popUpSubject$: of(arryaToNofity[7]),
            clouseAllert$: of('test-id'),
          }
        },
      ],
      imports: [ BrowserAnimationsModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    component.closeAlert();
    expect(component.alert).toBeUndefined();
  });
  it('should create noity', () => {
    component.popUpArryaController(arryaToNofity[0]);
    expect(component.popUpAlertArray.length).toEqual(1);
  });
  it('should create present noity', () => {
    component.popUpArryaController(arryaToNofity[0]);
    component.popUpArryaController(arryaToNofity[0]);
    expect(component.popUpAlertArray.length).toEqual(1);
  });
  it('should dismiss from noity', () => {
    component.popUpArryaController(arryaToNofity[0]);
    component.popUpArryaController(arryaToNofity[1]);
    expect(component.popUpAlertArray[0].idName).toEqual('test2');
  });
  it('should block from noity', () => {
    component.popUpArryaController(arryaToNofity[2]);
    expect(component.blockAll).toBeTruthy();

  });
  it('should dissmiss from noity one block', () => {
    component.popUpArryaController(arryaToNofity[2]);
    component.popUpArryaController(arryaToNofity[3]);
    component.popUpArryaController(arryaToNofity[4]);
    expect(component.blockAll).toBeTruthy();
  });
  it('should dissmiss from noity all block', () => {
    component.popUpArryaController(arryaToNofity[2]);
    component.popUpArryaController(arryaToNofity[3]);
    component.popUpArryaController(arryaToNofity[4]);
    component.popUpArryaController(arryaToNofity[5]);
    expect(component.blockAll).toBeFalsy();
  });
  it('should dissmiss from noity not Present elemtn', () => {
    component.popUpArryaController(arryaToNofity[2]);
    component.popUpArryaController(arryaToNofity[5]);
    expect(component.popUpAlertArray.length).toEqual(2);
  });
  it('should dissmiss from noity not Present elemtn', () => {
    component.popUpArryaController(arryaToNofity[2]);
    component.popUpArryaController(arryaToNofity[5]);
    expect(component.popUpAlertArray.length).toEqual(2);
  });

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should dissmiss automatily notify',  (done) => {
    component.popUpArryaController(arryaToNofity[6]);
    component.delay(arryaToNofity[6].setting.timing + 1000).then(_ => {
      expect(component.popUpAlertArray.length).toEqual(0);
      done();
    });
  });

});
