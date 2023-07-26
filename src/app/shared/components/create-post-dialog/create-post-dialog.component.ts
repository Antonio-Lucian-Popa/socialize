import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss']
})
export class CreatePostDialogComponent implements AfterViewInit {
  @ViewChild('postInput') postInputRef!: ElementRef;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  imageSrcs: string[] = [];

  userInput: string = '';
  title = "Create Post";
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postForm = this.fb.group({
      postContent: [''] // Valore iniziale del campo di testo del post
    });
  }

  ngAfterViewInit() {
    this.adjustTextareaHeight();
  }

  onInputChange() {
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight() {
    const textarea = this.postInputRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  removeImage(index: number) {
    this.imageSrcs.splice(index, 1);
  }

  closeDialog() {
    const result = {
      userInput: this.userInput,
      imageSrcs: this.imageSrcs
    };
    this.dialogRef.close(result);
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postContent = this.postForm.value.postContent;
      // Esegui le operazioni desiderate con il contenuto del post
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrcs.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
