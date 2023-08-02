import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  @Input() post: Post | undefined;

  posts: any[] = [];

  constructor(private postService: PostService) {}

  //TODO: Make post component to work also with post dialog and show the input post
  ngOnInit(): void {
    if(!this.post) {
      this.loadPosts();
    }
  }

  ngAfterViewInit() {
  }

  loadPosts() {
    this.posts = [
      {
        id: 1,
        description: "test",
        images: [
          "./assets/img/post-image.jpg",
          "./assets/img/post-image.jpg"
        ],
      },
      {
        id: 2,
        description: "jahdjasdh",
        images: [
          "./assets/img/post-image.jpg",
          "./assets/img/post-image.jpg"
        ],
      }
    ];
    // Update navigation visibility
   // this.showNavigation = this.posts.map(post => post.images.length > 1);
  }
}

