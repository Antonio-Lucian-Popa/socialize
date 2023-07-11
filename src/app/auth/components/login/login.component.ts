import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../../auth.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    if(this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe(res => {
        AuthInterceptor.accessToken = res.access_token;
        this.router.navigate(['/']);
      }, err => {
        // show alert error
      });
    }
  }

}
