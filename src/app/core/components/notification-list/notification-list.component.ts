import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notificationList: any[] = [
    {
      id: 1,
      typeOfIcon: "like",
      description: "like your photo",
      from: "Mattew"
    },
    {
      id: 2,
      typeOfIcon: "comment",
      description: "commented your photo",
      from: "Alina"
    }
  ];

  ngOnInit(): void {

  }

  openNotification(notificationId: string): void {
    console.log(notificationId);
    // TODO: go to the notification detail, we need another component that is opened when the user click on notification,
    // for example can open a dialog with the image like or commented, or dirrectly open a new component with image and comment, and also on the top
    // to have an arrow to go back to the notification list
  }

}
