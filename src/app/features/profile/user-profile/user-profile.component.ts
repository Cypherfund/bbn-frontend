import { Component } from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

  accountBalance: number = 5000;


  deposit(amount: number): void {
    this.accountBalance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
    } else {
      alert('Insufficient balance');
    }
  }


}
