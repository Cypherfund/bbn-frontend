import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-earn-coins',
  templateUrl: './earn-coins.component.html',
  styleUrl: './earn-coins.component.scss'
})
export class EarnCoinsComponent implements OnInit{
  divWidth = 100;
  private intervalId: any;
  constructor(private headerService: HeaderService) {
    this.headerService.setHeaderTitle('Earn Coins');
  }

  ngOnInit(): void {
    this.startResizing();

  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startResizing(): void {
    this.intervalId = setInterval(() => {
      if (this.divWidth > 0) {
        this.divWidth -= 10;
      } else {
        clearInterval(this.intervalId);
        setTimeout(() => {
          this.divWidth = 100;
          this.startResizing();
        }, 5000);
      }
    }, 1000);
  }

  follow() {
    this.headerService.followUser();
  }
}
