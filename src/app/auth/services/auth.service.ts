import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserRegisterForm } from '../interfaces/userRegisterForm';
import { UserLoginForm } from '../interfaces/userLoginForm';
import * as moment from "moment";
import jwt_decode from 'jwt-decode';

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
    return this.http.post<any>(`${this.URL}/authenticate`, userLoginForm, { withCredentials: true })
      .pipe(
        tap(res => this.setSession)
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.URL}/refresh-token`, {}, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.URL}/logout`, {}, { withCredentials: true });
  }

  private setSession(token: string) {
    const decodedToken = this.getDecodedAccessToken(token);
    const expiresAt = moment().add(decodedToken.exp, 'second');

    // localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("token", token);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
