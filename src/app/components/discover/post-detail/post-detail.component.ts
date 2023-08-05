import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  numberOfComments = 17;
  postData: Post | undefined;

  isCommentOpened = true;

  constructor() {}

  ngOnInit(): void {
    console.log("intra")
  }

  loadComments(): void {
    // TODO: we made an http call to get the comments using pageable
  }
}
