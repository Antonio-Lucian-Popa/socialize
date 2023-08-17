import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/auth/auth.interceptor';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchUser = this.fb.group({
    value: ""
  });

  constructor(
    private authService: AuthService,
    private router: Router,
   // private alertService: AlertService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    const alertSetting = {
      alertType: 'danger',
      message: 'test',
      timing: 5000,
      toDismiss: 'testing',
      closeButton: true
    }
    //this.alertService.openPopUpAlert(`testing`, 'Conflict', alertSetting);

    this.searchUser.get("value")?.valueChanges.subscribe(val => {
      console.log(val);
      // TODO: add logic for show the user that we search
    });
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      this.authService.clearAccessToken();
      this.router.navigate(['/login']);
    });
  }

}
