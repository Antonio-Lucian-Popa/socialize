import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/shared/interfaces/comment';
import { Post, User } from 'src/app/shared/interfaces/post';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @ViewChild('expandableTextarea')
  textarea!: ElementRef;

  @Input() showHeader = true;

  postId: string | null = "";
  numberOfComments = 17;
  postData!: Post;
  comments: any[] = []; // TODO: de schimbat key la object ca nu mai merg cu interfata Comment

  isCommentOpened = false;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private renderer: Renderer2
  ) { }


  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  loadComments(): void {
    console.log("intra")
    // TODO: we made an http call to get the comments using pageable
    this.isCommentOpened = true;
    if (this.postId) {
      this.commentService.getComments(this.postId, 0, 10).subscribe(data => {
        this.comments = data; // assuming content holds the comments in the pageable response
        this.adjustHeight(); // Adaugă această linie
        this.renderer.listen(this.textarea.nativeElement, 'input', this.adjustHeight.bind(this));
      });
    }
  }

  closeComments(): void {
    this.isCommentOpened = false;
  }

  adjustHeight() {
    const textareaEl = this.textarea.nativeElement;
    const minHeight = 18;

    // Resetăm înălțimea pentru a obține o măsurătoare corectă
    textareaEl.style.height = 'auto';
    textareaEl.style.height = '18px';

    if (textareaEl.scrollHeight > minHeight) {
        textareaEl.style.height = textareaEl.scrollHeight + 'px';
    } else {
        textareaEl.style.height = minHeight + 'px';
    }
}

checkIsUserLikePost(): boolean {
  // TODO: de revazut cum sa iau user id
  const userId = "123";
  const isCurrentUserLike = this.postData!.userLikes.find(user => user.id === userId);
  return isCurrentUserLike ? true : false;
}




}
