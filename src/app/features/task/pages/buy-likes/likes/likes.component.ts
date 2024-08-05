import { Component } from '@angular/core';
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent {
  userCoins = 0;

  likesPlan = [
    { name: 'Get 30 Likes', price: '400', type: 'coin' },
    { name: 'Get 40 Likes', price: '1.99', type: 'money' },
    { name: 'Get 100 Likes', price: '1000', type: 'coin' },
    { name: 'Get 200 Likes', price: '9.79', type: 'money' },
    { name: 'Get 300 Likes', price: '29.99', type: 'money' },
    { name: 'Get 400 Likes', price: '39.99', type: 'money' },
    { name: 'Get 500 Likes', price: '49.99', type: 'money' },
    { name: 'Get 600 Likes', price: '59.99', type: 'money' },
    { name: 'Get 700 Likes', price: '69.99', type: 'money' },
    { name: 'Get 800 Likes', price: '79.99', type: 'money' },
    { name: 'Get 900 Likes', price: '89.99', type: 'money' },
    { name: 'Get 1000 Likes', price: '99.99', type: 'money' },
  ];

  packageGrowth = [
    { likes: 30, coins: 100, price: 9.99 },
    { likes: 60, coins: 200, price: 24.99 },
    { likes: 200, coins: 500, price: 49.99 },
    { likes: 500, coins: 1000, price: 99.99 },
    { likes: 800, coins: 1500, price: 149.99 }
  ];

  constructor(private headerService: HeaderService) {
    this.headerService.setHeaderTitle('Promote');
    this.headerService.showBackIcon();
  }

  ngOnDestroy() {
    this.headerService.resetHeaderLeftIcon();
  }
}
