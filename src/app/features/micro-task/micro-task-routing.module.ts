import { BuyCoinsComponent } from './../task/pages/buy-coins/buy-coins.component';
import { MicroTaskComponent } from './micro-task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarnCoinsComponent } from '../task/pages/earn-coins/earn-coins.component';
import { BuyLikesComponent } from '../task/pages/buy-likes/buy-likes.component';
import { LikesComponent } from '../task/pages/buy-likes/likes/likes.component';
import { BuyFollowersComponent } from '../task/pages/buy-followers/buy-followers.component';

const routes: Routes = [
  {
    path: '',
    component: MicroTaskComponent,
    children: [
      {
        path: 'earn-coins',
        component: EarnCoinsComponent
      },
      {
        path: 'buy-likes',
        component: BuyLikesComponent,
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
