import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/api/v1/posts/findAll`);
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/api/v1/posts/findById/${postId}`);
  }
}
