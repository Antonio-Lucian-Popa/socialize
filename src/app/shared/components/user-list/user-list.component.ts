import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any[] = [
    {
      id: 1,
      firstName: "Andreea",
      lastName: "Sava",
      profileImage: "./assets/img/female.jpeg",
      backgroundImage: "../../../../assets/img/post-image.jpg",
      isFollowByMe: true,
    },
    {
      id: 2,
      firstName: "Bia",
      lastName: "Lovi",
      profileImage: "./assets/img/female.jpeg",
      backgroundImage: "../../../../assets/img/post-image.jpg",
      isFollowByMe: false,
    }
  ];

  btnMessage = "Follow";

  ngOnInit(): void {

  }

  follow(userId: string): void {
    console.log(userId);
  }

  unfollow(userId: string): void {
    console.log(userId);
  }


}
