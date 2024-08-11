import { Tips } from './../model/tips-data';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tips-screen',
  templateUrl: './tips-screen.component.html',
  styleUrl: './tips-screen.component.scss'
})
export class TipsScreenComponent {
  @Input() tips : Tips[] = [];

  activeTipsIndex = 0
  tipsToShow = this.tips[this.activeTipsIndex]
 
  nav = false

  moveToNextTips = () => {
    const numOfTips = this.tips.length
    if (this.activeTipsIndex < numOfTips) {
      this.activeTipsIndex += 1

      if(this.activeTipsIndex === numOfTips) {
        this.activeTipsIndex -= 1
        this.nav = true
      }
    }
   if (this.nav) {
    console.log('moving to sign up page');
   }

  }
  
}
