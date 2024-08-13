import { Router } from '@angular/router';
import { Tips } from './../model/tips-data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tips-screen',
  templateUrl: './tips-screen.component.html',
  styleUrl: './tips-screen.component.scss'
})
export class TipsScreenComponent implements OnInit{
  ngOnInit(): void {
    this.showSplashScrn.emit(true);
  }

  @Output() showSplashScrn = new EventEmitter<boolean>();

  constructor(private router: Router) {}
  
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
    this.showSplashScrn.emit(false);
    this.router.navigate(['micro-task/sign-up'])
   }

   
  }

  navToSignUpPage() {
    this.showSplashScrn.emit(false);
   }
  
  
}
