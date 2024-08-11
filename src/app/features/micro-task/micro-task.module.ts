import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MicroTaskRoutingModule } from './micro-task-routing.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MicroTaskComponent } from './micro-task.component';
import { TipsScreenComponent } from './tips-screen/tips-screen.component';



@NgModule({
  declarations: [
    MicroTaskComponent,
    SplashScreenComponent,
    TipsScreenComponent,
  ],
  imports: [
    CommonModule,
    MicroTaskRoutingModule,
  ]
})
export class MicroTaskModule { }
