import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  URL_LINK = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getAllNotification(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_LINK}/notifications`);
  }
}
