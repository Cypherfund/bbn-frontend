import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import {Route, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";

const routes: Route[] = [
  {path: '', component: AccountComponent}
]


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
