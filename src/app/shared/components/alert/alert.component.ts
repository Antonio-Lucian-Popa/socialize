import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':leave', animate('500ms ease-out')) // Fade out animation on leave
    ])
  ]
})
export class AlertComponent implements OnInit {

  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() message: string = '';
 // closeAlert!: () => void;  // This will be assigned by the service

  dismissed = false;

  onAnimationDone(): void {
    if (this.dismissed) {
      this.closeAlert();
    }
  }

  closeAlert(): void {
    this.dismissed = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.closeAlert();
    }, 3000); // 5000 milliseconds = 5 seconds
  }

  getAlertClasses(): any {
    return {
      'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800': this.type === 'success',
      'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800': this.type === 'error',
      'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:border-blue-800': this.type === 'info',
      'border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800': this.type === 'warning'
    };
  }

}
