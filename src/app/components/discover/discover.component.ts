import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewPostDialogComponent } from 'src/app/shared/components/view-post-dialog/view-post-dialog.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  windowWidth: number | undefined;

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

  // HostListener decorator to listen to window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.windowWidth = window.innerWidth; // Update the window width on resize
    console.log('Window width:', this.windowWidth); // You can perform any action here when the window is resized
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.searchUser.get("value")?.valueChanges.subscribe(val => {
      console.log(val);
      // TODO: add logic for show the user that we search
    });

    this.windowWidth = window.innerWidth; // Initialize the window width

    // Subscribe to window resize event
    this.onResize();
  }

  openImage(postId: string): void {
    // if the width is not mobile
    if (this.windowWidth && this.windowWidth > 800) {
      const dialogRef = this.dialog.open(ViewPostDialogComponent, {
        width: '900px',
        //height: '700px',
        data: {
          postId: postId
        },
        panelClass: "customDialog"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
        }
      });
    } else if (this.windowWidth) {
      // if the width is mobile
      // routing with post id
      console.log(this.route)
      this.router.navigate(['/discover/post-detail', postId]);
     // this.router.navigate(['/discover', 'post-detail', postId]);
    // this.router.navigate(['post-detail', postId], { relativeTo: this.route });

    }
  }
}
