import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DatePipe } from '@angular/common';
import { RelativeTimePipe } from 'src/app/shared/pipe/relative-time.pipe';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notifications: any[] = []; // You would retrieve your notifications and store them here
  categorizedNotifications: { [key: string]: any[] } = {};

  private skip = 0; // Keep track of the number of notifications loaded
  private limit = 5; // Decide how many notifications to load each time

  constructor(private notificationService: NotificationService, private datePipe: DatePipe, private relativeTimePipe: RelativeTimePipe) { }

  ngOnInit(): void {
    // this.notificationService.getAllNotification().subscribe(notification => {
    //   this.categorizeNotifications(notification);
    //   console.log(this.categorizeNotifications);
    // });
    this.loadMore();
  }

  categorizeNotifications(notifications: any[]) {
   notifications.forEach(notification => {
      let date = new Date(notification.createdAt); // Assuming the field is 'date'
      let now = new Date();
      let differenceInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      let label;
      if (differenceInDays === 0) {
        label = 'Today';
      } else if (differenceInDays === 1) {
        label = 'Yesterday';
      } else {
        // For dates older than yesterday, use the format 'MMM dd, yyyy'
        label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      }

      if (!this.categorizedNotifications[label]) {
        this.categorizedNotifications[label] = [];
      }
      this.categorizedNotifications[label].push(notification);
    });
  }

  openNotification(notificationId: string): void {
    console.log(notificationId);
    // TODO: go to the notification detail, we need another component that is opened when the user click on notification,
    // for example can open a dialog with the image like or commented, or dirrectly open a new component with image and comment, and also on the top
    // to have an arrow to go back to the notification list

    // and also mark this notification id as read
    // this.notificationList.map(notification => {
    //   if (notification.id === notificationId) {
    //     notification.isNew = false;
    //   }
    //   return notification;
    // })
  }

  loadMore(): void {
    this.notificationService
      .getAllNotification(this.skip, this.limit)
      .subscribe((notifications) => {
        this.notifications = [...this.notifications, ...notifications];
        this.skip += this.limit;
        this.categorizeNotifications(notifications);
      });
  }

}
