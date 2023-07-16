import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from './alert.service';

@NgModule({
  imports: [
    CommonModule,
    NgbAlertModule,
  ],
  exports: [
    AlertComponent
  ],
  declarations: [
    AlertComponent
  ],
  providers: [
    AlertService
  ]
})
export class AlertModule {
}
