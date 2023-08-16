import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const alertSetting = {
  alertType: 'danger',
  message: 'test',
  timing: 5000,
  toDismiss: 'waiting-alert',
  closeButton: true
}

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  toasts: any[] = [];

  constructor() { }

  /**
   * interceptor for all the http request. For now skip the client errors.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
           // this.alertService.send(`A Server error has happened (${error.statusText})`, 'danger');
          } else {
            switch (error.status.toString()[0]) {
              case '4':
                if (error.status.toString() == '409') {
                  //this.alertService.closePopUpAlert('err-409');
                  alertSetting.timing = 5000;
                  alertSetting.toDismiss = 'err-409';
                  alertSetting.message = `You are trying to save a duplicated value!`;
                  //this.alertService.openPopUpAlert(`err-409`, 'Conflict', alertSetting);
                }
                break;
              case '5':
                alertSetting.toDismiss = 'err-500';
                alertSetting.message = `A Server error has happened (${error.statusText})`;
               // this.alertService.openPopUpAlert(`err-500`, 'Server error', alertSetting);
                break;
              default:
                alertSetting.toDismiss = 'err-unknown';
                alertSetting.message = `A Server error has happened (${error.statusText})`;
               // this.alertService.openPopUpAlert(`err-unknown`, 'Unknown error', alertSetting);
            }
          }
        } else {
          alertSetting.toDismiss = 'err';
          alertSetting.message = `An error happened (${error.statusText})`;
          //this.alertService.openPopUpAlert(`err`, 'Generic error', alertSetting);
        }
        //if (error.status !== 409 )
        return throwError(error);
      })
    );
  }
}

