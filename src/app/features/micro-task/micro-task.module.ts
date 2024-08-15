import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MicroTaskRoutingModule } from './micro-task-routing.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MicroTaskComponent } from './micro-task.component';
import { TipsScreenComponent } from './tips-screen/tips-screen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';



@NgModule({
  declarations: [
    MicroTaskComponent,
    SplashScreenComponent,
    TipsScreenComponent,
    SignUpComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    MicroTaskRoutingModule,
    MatExpansionModule
  ]
})
export class MicroTaskModule { }
