import {Injectable} from "@angular/core";


@Injectable()
export class EarnService {
  divWidth = 50;
  intervalId: any;
  constructor() {
    this.startResizing();
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
}
