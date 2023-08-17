import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { UserRegisterForm } from '../interfaces/userRegisterForm';
import { UserLoginForm } from '../interfaces/userLoginForm';
import * as moment from "moment";
import jwt_decode from 'jwt-decode';


export interface Token {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = "http://localhost:8080/api/v1/auth";
  private accessToken = '';

  constructor(private http: HttpClient) { }

  register(userRegisterForm: UserRegisterForm): Observable<any> {
    return this.http.post<any>(`${this.URL}/register`, userRegisterForm);
  }

  login(userLoginForm: UserLoginForm): Observable<any> {
    // to get the refresh token we need to add { withCredential: true }
    return this.http.post<any>(`${this.URL}/authenticate`, userLoginForm)
      .pipe(
        map(res => {
          this.setSession(res);
          return res;
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.URL}/refresh-token`, {}, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.URL}/logout`, {}, { withCredentials: true });
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = '';
  }

  private setSession(token: Token) {
    if (token) {
      const decodedToken = this.getDecodedAccessToken(token.access_token);
      const expiresAt = moment().add(decodedToken.exp, 'second');
      this.setAccessToken(token.access_token);
      // localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem("token", token.access_token);
      localStorage.setItem("user_id", decodedToken.userId);
      console.log(this.getAccessToken());
    }
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
