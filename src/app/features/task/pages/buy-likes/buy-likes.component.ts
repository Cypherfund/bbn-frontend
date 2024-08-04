import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-likes',
  templateUrl: './buy-likes.component.html',
  styleUrl: './buy-likes.component.scss'
})
export class BuyLikesComponent {
  userCoins = 0;
  videoUrl = '';
  coverImages = [
    'assets/images/cover1.jpg',
    'assets/images/cover2.jpg',
    'assets/images/cover3.jpg',
    'assets/images/cover4.jpg'
  ];

  clearUrl() {
    this.videoUrl = '';
  }

  continue() {
    // Add functionality to proceed with the provided URL
    console.log('Video URL:', this.videoUrl);
  }
}
