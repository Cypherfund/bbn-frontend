import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  userCoins: number = 0;

  followUser() {
    this.userCoins += 4;
  }
}
