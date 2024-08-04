import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements AfterViewInit{
  userCoins: number = 0;

  followUser() {
    this.userCoins += 4;
  }

  ngAfterViewInit() {
    this.checkStickySupport();
  }

  checkStickySupport() {
    const header = document.querySelector('.header') as HTMLElement;
    // const bottomNav = document.querySelector('.bottom-nav') as HTMLElement;

    if (CSS.supports('position', 'sticky')) {
      return; // Sticky is supported
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 0) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
      } else {
        header.style.position = 'sticky';
        header.style.top = '';
        header.style.width = '';
      }

      // if (window.innerHeight + scrollTop >= document.body.offsetHeight) {
      //   bottomNav.style.position = 'fixed';
      //   bottomNav.style.bottom = '0';
      //   bottomNav.style.width = '100%';
      // } else {
      //   bottomNav.style.position = 'sticky';
      //   bottomNav.style.bottom = '';
      //   bottomNav.style.width = '';
      // }
    });
  }
}
