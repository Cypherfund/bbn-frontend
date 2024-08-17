import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MicroTaskRoutingModule } from './micro-task-routing.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MicroTaskComponent } from './micro-task.component';
import { TipsScreenComponent } from './tips-screen/tips-screen.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticateComponent } from './component/authenticate/authenticate.component';



@NgModule({
  declarations: [
    MicroTaskComponent,
    SplashScreenComponent,
    TipsScreenComponent,
    SignUpComponent,
    SignupFormComponent,
    AuthenticateComponent,
  ],
  imports: [
    CommonModule,
    MicroTaskRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MicroTaskModule { }
