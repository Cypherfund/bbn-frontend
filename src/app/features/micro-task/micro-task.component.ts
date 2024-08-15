import { Component } from '@angular/core';
import tips, { Tips } from './model/tips-data';

@Component({
  selector: 'app-micro-task',
  templateUrl: './micro-task.component.html',
  styleUrl: './micro-task.component.scss'
})
export class MicroTaskComponent  {

  isLoading : boolean = true;
  showTips! : boolean;

  remTips : boolean = true;
  removeTips($event : boolean): void {
    this.remTips = $event
    // if (!this.remTips) {
    //   this.showTips = false;
    // }
  }   

  tipsData : Tips[] = tips;
  

  // @ViewChild(TipsScreenComponent ) signUpComponent!: TipsScreenComponent ;
  // showSplashScreen!:boolean

  // ngAfterViewInit(): void {
  //   console.log(this.signUpComponent?.showSplashScrn)
  //   this.showSplashScreen = this.signUpComponent.showSplashScrn

    
  // }
  
  ngOnInit(): void {

    setTimeout(() => {
      this.isLoading = false
      this.showTips = true
    }, 1000)
    
  }
}
