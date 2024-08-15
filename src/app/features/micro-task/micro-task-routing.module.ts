import { BuyCoinsComponent } from './../task/pages/buy-coins/buy-coins.component';
import { MicroTaskComponent } from './micro-task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LikesComponent } from '../task/pages/buy-likes/likes/likes.component';
import { BuyFollowersComponent } from '../task/pages/buy-followers/buy-followers.component';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupFormComponent } from './component/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: '',
    component: MicroTaskComponent,
    children: [
      {
        path: 'intro',
        component: SignUpComponent
      },
      {
        path: 'sign-up',
        component: SignupFormComponent,
      },
      {
        path: 'promote',
        component: LikesComponent,
      },
      {
        path: 'buy-followers',
        component: BuyFollowersComponent,
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
