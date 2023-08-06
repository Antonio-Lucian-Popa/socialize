import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getComments(postId: string, page: number, size: number): Observable<Comment[]> {
    const params = {
        postId: postId.toString(),
        page: page.toString(),
        size: size.toString()
    };
    //return this.http.get<Comment[]>(`${this.URL}/api/v1/comments`, { params });
    return this.http.get<Comment[]>(`http://localhost:3000/comments`);
}

}
