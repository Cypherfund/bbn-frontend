import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MicroTaskRoutingModule } from './micro-task-routing.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MicroTaskComponent } from './micro-task.component';



@NgModule({
  declarations: [
    MicroTaskComponent,
    SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    MicroTaskRoutingModule,
  ]
})
export class MicroTaskModule { }
