import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { CommentSegment } from '../interfaces/comment-segment';

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

  getSubComments(parentCommentId: string): Observable<Comment[]> {
    const params = new HttpParams().set('parentCommentId', parentCommentId);
    return this.http.get<Comment[]>(`${this.URL}/api/v1/subcomments`, { params });
  }

  processComment(comment: string): CommentSegment[] {
    const mentionRegex = /@([a-zA-Z0-9_]+)/g;
    let lastIndex = 0;
    const segments: CommentSegment[] = [];

    let match;
    while ((match = mentionRegex.exec(comment)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          content: comment.substring(lastIndex, match.index),
        });
      }

      segments.push({ type: 'mention', content: match[0] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < comment.length) {
      segments.push({
        type: 'text',
        content: comment.substring(lastIndex),
      });
    }

    return segments;
  }

}
