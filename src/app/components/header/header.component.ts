import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLogged!: boolean;
  constructor(public readonly userService: UserService){
  }

  ngOnInit() {
    this.isLogged = !!Object.keys(this.userService.user).length;
    this.userService.login$.pipe().subscribe( loginVal => {
      if (loginVal === 1) {
        this.isLogged = !!Object.keys(this.userService.user).length;
      } else {
        this.isLogged = false;
      }
    })
  }
}
