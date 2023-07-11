import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterForm } from '../interfaces/userRegisterForm';
import { UserLoginForm } from '../interfaces/userLoginForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient) { }

  register(userRegisterForm: UserRegisterForm): Observable<any> {
    return this.http.post<any>(`${this.URL}/register`, userRegisterForm);
  }

  login(userLoginForm: UserLoginForm): Observable<any> {
    // to get the refresh token we need to add { withCredential: true }
    return this.http.post<any>(`${this.URL}/authenticate`, userLoginForm, { withCredentials: true});
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.URL}/refresh-token`, {},  { withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.URL}/logout`, {},  { withCredentials: true});
  }
}
