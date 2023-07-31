import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

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

  constructor() {}

  ngOnInit(): void {
  }

  openImage(imageId: string): void {
    console.log(imageId);
  }

}
