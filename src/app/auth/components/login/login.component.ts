import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../../auth.interceptor';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.alertService.showAlert('error', 'An error occurred!');
  }

  submit(): void {
    if(this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe(res => {
        this.authService.setAccessToken(res.access_token);
        this.router.navigate(['/']);
      }, err => {
        // show alert error
      });
    }
  }

  checkRequiredField(fieldName: string): boolean {
    return this.form.get(fieldName)!.invalid && (this.form.get(fieldName)!.dirty || this.form.get(fieldName)!.touched) && this.form.get(fieldName)!.hasError('required')
  }

}
