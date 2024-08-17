import { BuyCoinsComponent } from './../task/pages/buy-coins/buy-coins.component';
import { MicroTaskComponent } from './micro-task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyFollowersComponent } from '../task/pages/buy-followers/buy-followers.component';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { AuthenticateComponent } from './component/authenticate/authenticate.component';
import { AuthenSuccessComponent } from './component/authen-success/authen-success.component';

const routes: Routes = [
  {
    path: '',
    component: MicroTaskComponent,
    children: [
      {
        path: 'intro',
        component: SignUpComponent,
        title: 'intro'
      },
      {
        path: 'sign-up',
        component: SignupFormComponent,
        title: 'SignUp'
      },
      {
        path: 'authenticator',
        component: AuthenticateComponent,
        title: 'authenticate'
      },
      {
        path: 'success-auth',
        component: AuthenSuccessComponent,
        title: 'successful'
      },
      {
        path: 'buy-coins',
        component: BuyCoinsComponent,
      },
      // {
      //   path: '',
      //   redirectTo: '/task/earn-coins',
      //   pathMatch: 'full'
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicroTaskRoutingModule { }
