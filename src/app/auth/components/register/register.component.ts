import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    birthday: ['', Validators.required],
    gender: ['']
  });

  constructor
  (private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  submit(): void {
    if(this.form.valid) {
      console.log(this.form.value);
      // this.authService.register(this.form.getRawValue()).subscribe(res => {
      //   this.router.navigate(['/login']);
      // }, err => {
      //   // show alert error
      // });
    }
  }

  checkRequiredField(fieldName: string): boolean {
    return this.form.get(fieldName)!.invalid && (this.form.get(fieldName)!.dirty || this.form.get(fieldName)!.touched) && this.form.get(fieldName)!.hasError('required')
  }

}
