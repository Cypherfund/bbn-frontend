import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-buy-likes',
  templateUrl: './buy-likes.component.html',
  styleUrl: './buy-likes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BuyLikesComponent {
  videoUrl = '';
  coverImages: string[] = []

  constructor(private headerService: HeaderService) {
    this.headerService.setHeaderTitle('Buy Likes');
    this.coverImages = [
      'assets/images/cover1.jpg',
      'assets/images/cover2.jpg',
      'assets/images/cover3.jpg',
      'assets/images/cover4.jpg',
      'assets/images/cover1.jpg',
      'assets/images/cover2.jpg',
      'assets/images/cover3.jpg',
      'assets/images/cover4.jpg'
    ];
  }
  clearUrl() {
    this.videoUrl = '';
  }

}
