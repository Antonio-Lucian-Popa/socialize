import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  @ViewChild('postInput') postInputRef!: ElementRef;


  adjustTextareaHeight() {
    const postInput = this.postInputRef.nativeElement as HTMLTextAreaElement;
    postInput.style.height = 'auto'; // Reimposta l'altezza a "auto" per calcolare la dimensione corretta
    postInput.style.height = postInput.scrollHeight + 'px'; // Imposta l'altezza in base all'altezza del contenuto
  }

  postContent: string = '';

  userInput: any;

  constructor(private dialog: MatDialog) {
  }

  openImageDialog() {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '400px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userInput = result.userInput;
      }
    });
  }

}
