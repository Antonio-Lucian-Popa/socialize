import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string): string {
    let givenDate = new Date(value);
    let now = new Date();
    let differenceInMilliSeconds = Math.abs(now.getTime() - givenDate.getTime());

    const seconds = Math.floor(differenceInMilliSeconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 2) {
      return `${days} days ago`;
    } else if (days === 2) {
      return '2 days ago';
    } else if (days === 1) {
      return 'yesterday';
    } else if (hours > 1) {
      return `${hours}h ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }
}
