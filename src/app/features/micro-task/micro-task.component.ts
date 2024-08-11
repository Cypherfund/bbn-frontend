import { Component } from '@angular/core';
import tips, { Tips } from './model/tips-data';

@Component({
  selector: 'app-micro-task',
  templateUrl: './micro-task.component.html',
  styleUrl: './micro-task.component.scss'
})
export class MicroTaskComponent {
  isLoading : boolean = true;
  showTips : boolean = false;

  tipsData : Tips[] = tips;
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
      this.showTips = true
    }, 1000)
    
  }
}
