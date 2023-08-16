import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-user-add-comment-input',
  templateUrl: './user-add-comment-input.component.html',
  styleUrls: ['./user-add-comment-input.component.scss']
})
export class UserAddCommentInputComponent implements OnInit {

  userComment = this.fb.group({
    value: ['']
  });

  @Input()
  backgroundColor!: string;

  constructor(private fb: FormBuilder, private commentService: CommentService) {}

  ngOnInit(): void {
    //this.userComment.get("value")?.valueChanges.subscribe(val => console.log(val));
  }

  addComment(): void {
    // Check if the form is valid
    const commentValue = this.userComment.get("value")?.value;
    // TODO: de vazut cum fac sa iau userId din jwt token
    // const userId: string = localStorage.getItem("userId") ? localStorage.getItem("userId") : "";
    // if(commentValue) {
    //   this.commentService.createComment(userId, commentValue).subscribe();
    // }
    // send the payload to the back-end to add my comment
    // emit my comment to the parent component to add my comment in comments array
  }

}
