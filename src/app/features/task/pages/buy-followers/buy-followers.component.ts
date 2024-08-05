import { Component } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-buy-followers',
  templateUrl: './buy-followers.component.html',
  styleUrl: './buy-followers.component.scss'
})
export class BuyFollowersComponent {
  userCoins = 0;

  followerPlans = [
    { name: 'Get 30 Followers', price: '400', type: 'coin' },
    { name: 'Get 40 Followers', price: '1.99', type: 'money' },
    { name: 'Get 100 Followers', price: '1000', type: 'coin' },
    { name: 'Get 200 Followers', price: '9.79', type: 'money' },
    { name: 'Get 300 Followers', price: '29.99', type: 'money' },
    { name: 'Get 400 Followers', price: '39.99', type: 'money' },
    { name: 'Get 500 Followers', price: '49.99', type: 'money' },
    { name: 'Get 600 Followers', price: '59.99', type: 'money' },
    { name: 'Get 700 Followers', price: '69.99', type: 'money' },
    { name: 'Get 800 Followers', price: '79.99', type: 'money' },
    { name: 'Get 900 Followers', price: '89.99', type: 'money' },
    { name: 'Get 1000 Followers', price: '99.99', type: 'money' },
  ];

  weeklyPlans = [
    { followers: 30, coins: 100, price: 9.99 },
    { followers: 60, coins: 200, price: 24.99 },
    { followers: 200, coins: 500, price: 49.99 },
    { followers: 500, coins: 1000, price: 99.99 },
    { followers: 800, coins: 1500, price: 149.99 }
  ];

  constructor(private headerService: HeaderService) {
    this.headerService.setHeaderTitle('Buy Followers');
  }
}
