import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { EarnCoinsComponent } from './pages/earn-coins/earn-coins.component';
import { BuyLikesComponent } from './pages/buy-likes/buy-likes.component';
import { BuyFollowersComponent } from './pages/buy-followers/buy-followers.component';
import { BuyCoinsComponent } from './pages/buy-coins/buy-coins.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    TaskComponent,
    EarnCoinsComponent,
    BuyLikesComponent,
    BuyFollowersComponent,
    BuyCoinsComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    TaskRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    MatTabsModule
  ]
})
export class TaskModule { }
