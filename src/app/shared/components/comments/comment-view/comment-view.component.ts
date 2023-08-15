import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/interfaces/comment';
import { CommentSegment } from 'src/app/shared/interfaces/comment-segment';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit{
  @Input()
  comment!: Comment;

  @Input()
  path!: string;

  commentSegments: CommentSegment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentSegments = this.commentService.processComment(this.comment.content);
  }

  loadMoreSubcomments(commentId: string) {
    // Your logic to load more subcomments
  }
}
