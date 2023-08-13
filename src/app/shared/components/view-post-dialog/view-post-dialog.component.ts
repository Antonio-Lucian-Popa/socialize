import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-view-post-dialog',
  templateUrl: './view-post-dialog.component.html',
  styleUrls: ['./view-post-dialog.component.scss']
})
export class ViewPostDialogComponent implements OnInit {

  postId: string = "";
  post: Post | undefined;

  constructor(
    public dialogRef: MatDialogRef<ViewPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService
    ) {
      this.postId = this.data.postId;
    }

  ngOnInit(): void {
   // this.postService.getPostById(this.postId).subscribe(post => this.post = post);
    this.post = {
      id: "1",
      description: "test",
      image: "./assets/img/post-image.jpg",
      createdAt: new Date("2023/02/12"),
      user: {
        id: "1",
        firstName: "Jake",
        lastName: "kend"
      },
      userLikes: [
        {
          id: "34",
          firstName: "Andreea",
          lastName: "Luk"
        },
      ]
    }
  }

}
