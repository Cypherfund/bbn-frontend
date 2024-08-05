import { Component} from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {EarnService} from "./earn-service";

@Component({
  selector: 'app-earn-coins',
  templateUrl: './earn-coins.component.html',
  styleUrl: './earn-coins.component.scss',
  providers: [EarnService]
})
export class EarnCoinsComponent{
  constructor(private headerService: HeaderService,
              public earnService: EarnService) {
    this.headerService.setHeaderTitle('Earn Coins');
  }

  ngOnDestroy(): void {
    if (this.earnService.intervalId) {
      clearInterval(this.earnService.intervalId);
    }
  }

  follow() {
    this.headerService.followUser();
  }
}
