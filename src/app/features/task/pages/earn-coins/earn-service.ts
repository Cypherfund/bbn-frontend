import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";


@Injectable()
export class EarnService {
  divWidth = 50;
  intervalId: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId))
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
