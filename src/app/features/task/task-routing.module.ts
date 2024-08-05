import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import {UserService} from "../../services/user/user.service";
import {EarnCoinsComponent} from "./pages/earn-coins/earn-coins.component";
import {BuyFollowersComponent} from "./pages/buy-followers/buy-followers.component";
import {BuyCoinsComponent} from "./pages/buy-coins/buy-coins.component";
import {BuyLikesComponent} from "./pages/buy-likes/buy-likes.component";
import {LikesComponent} from "./pages/buy-likes/likes/likes.component";

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
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
      {
        path: '',
        redirectTo: '/task/earn-coins',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/task/earn-coins',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
  //do not show header and footer on destroy show header and footer
  constructor(private userService: UserService,) {
  }
}
