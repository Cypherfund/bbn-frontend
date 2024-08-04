import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-earn-coins',
  templateUrl: './earn-coins.component.html',
  styleUrl: './earn-coins.component.scss'
})
export class EarnCoinsComponent implements OnInit{
  timeout: number = 0;

  ngOnInit(): void {
    this.timeout = 100;
    this.reduceTimeout();
  }

  private reduceTimeout() {
    if (this.timeout >= 10) {
      this.timeout -= 10;
      if (this.timeout === 0) {
        setTimeout(() => {
          this.timeout = 100;
          this.reduceTimeout();
        }, 5000);
      } else setTimeout(() => this.reduceTimeout(), 1000);
    }
  }
}
