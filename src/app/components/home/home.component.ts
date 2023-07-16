import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/auth/auth.interceptor';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    const alertSetting = {
      alertType: 'danger',
      message: 'test',
      timing: 5000,
      toDismiss: 'testing',
      closeButton: true
    }
    this.alertService.openPopUpAlert(`testing`, 'Conflict', alertSetting);
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      AuthInterceptor.accessToken = '';
      this.router.navigate(['/login']);
    });
  }

}
