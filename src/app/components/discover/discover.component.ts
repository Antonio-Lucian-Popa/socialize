import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewPostDialogComponent } from 'src/app/shared/components/view-post-dialog/view-post-dialog.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  searchUser = this.fb.group({
    value: ""
  });

  popularImages: any[] = [
    {
      id: 1,
      value: "./assets/img/post-image.jpg",
      userInfo: {
        id: 34,
        firstName: "Alex",
        lastName: "Dumbrava",
        profileImage: "./assets/img/female.jpeg"
      }
    },
    {
      id: 2,
      value: "./assets/img/post-image.jpg",
      userInfo: {
        id: 34,
        firstName: "Alex",
        lastName: "Dumbrava",
        profileImage: "./assets/img/female.jpeg"
      }
    }
  ];

  constructor( private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchUser.get("value")?.valueChanges.subscribe(val => {
      console.log(val);
      // TODO: add logic for show the user that we search
    });
  }

  openImage(imageId: string): void {
    const dialogRef = this.dialog.open(ViewPostDialogComponent, {
      width: '900px',
      data: {
        postId: imageId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
}
