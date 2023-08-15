import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postId: string = "";

  currentPage = 1;
  pageSize = 10;

  comments: Comment[] = [];
  subComments: Comment[] = [];
  subCommentsLoaded = false;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    // this.commentService.getComments(this.postId, this.currentPage, this.pageSize).subscribe(data => {
    //   this.comments = data;
    // });



    this.comments = [
      {
        id: '1',
        author: {
          id: '1',
          profileImage: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
          firstName: 'John',
          lastName: 'Doe'
        },
        createdAt: new Date().toISOString(),
        formattedDate: '2 hours ago',
        content: 'This is a regular comment without any mentions.',
        segments: [
          { type: 'text', content: 'This is a regular comment without any mentions.' }
        ],
        subcomments: [
          {
            id: '2',
            author: {
              id: '2',
              profileImage: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
              firstName: 'Alice',
              lastName: 'Smith'
            },
            createdAt: new Date().toISOString(),
            formattedDate: '1 hour ago',
            content: '@JohnDoe Thanks for sharing this! Also, @BobBuilder, check this out.',
            segments: [
              { type: 'mention', content: '@JohnDoe' },
              { type: 'text', content: ' Thanks for sharing this! Also, ' },
              { type: 'mention', content: '@BobBuilder' },
              { type: 'text', content: ', check this out.' }
            ],
            subcomments: [],
            hasMoreSubcomments: false
          }
        ],
        hasMoreSubcomments: true
      }
    ];
  }

  loadSubComments(commentId: string): void {
    this.commentService.getSubComments(commentId).subscribe(data => {
      this.subComments = data;
      this.subCommentsLoaded = true;
    });
  }

  loadMoreSubcomments(commentId: string) {
    // Logic to load more subcomments for the comment with the given ID
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadComments();
    }
  }

  nextPage() {
    // You might want to add a check if there's a next page
    this.currentPage++;
    this.loadComments();
  }

}
