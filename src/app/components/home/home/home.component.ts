import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/auth/auth.interceptor';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      AuthInterceptor.accessToken = '';
      this.router.navigate(['/login']);
    });
  }

}
