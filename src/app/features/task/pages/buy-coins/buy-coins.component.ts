import { Component } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.component.html',
  styleUrl: './buy-coins.component.scss'
})
export class BuyCoinsComponent {
  userCoins = 0;
  products = [
    {
      name: '',
      price: 0.99,
      imageUrl: '/assets/tasks/once-only-pack.jpeg', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$0.99',
      buttonClass: ''
    },
    {
      name: '',
      price: 0,
      imageUrl: '/assets/tasks/growth-pack.jpeg',
      backgroundColor: this.getRandomGradient(),
      buttonText: 'Growth',
      buttonClass: 'growth'
    },
    {
      name: '140 Coins',
      price: 0.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$0.99',
      buttonClass: ''
    },
    {
      name: '500 Coins',
      price: 1.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$1.99',
      buttonClass: ''
    },
    {
      name: '1000 Coins',
      price: 2.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$2.99',
      buttonClass: ''
    },
    {
      name: '2000 Coins',
      price: 4.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$4.99',
      buttonClass: ''
    },
    {
      name: '5000 Coins',
      price: 9.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$9.99',
      buttonClass: ''
    },
    {
      name: '10000 Coins',
      price: 19.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$19.99',
      buttonClass: ''
    },
    {
      name: '20000 Coins',
      price: 39.99,
      imageUrl: '/assets/tasks/coins-pack.png', // Empty to use gradient background
      backgroundColor: this.getRandomGradient(),
      buttonText: '$39.99',
      buttonClass: ''
    }
    // Add more products as needed
  ];

  getRandomGradient(): string {
    const gradients = [
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
      'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }

  constructor(private headerService: HeaderService) {
    this.headerService.setHeaderTitle('Store');
  }
}
