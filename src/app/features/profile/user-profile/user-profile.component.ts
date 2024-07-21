import { Component } from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user: any;

  constructor(public userService: UserService) {
    // Fetch user data (this should come from a service in a real application)
    this.user = {
      name: 'Elizabeth Ngai',
      id: '0345DG9',
      email: 'elizabeth.ngai@example.com',
      balance: 10000,
      phoneNumber: '+237 650 076 456'
    };
  }

  ngOnInit(): void {
  }
}
