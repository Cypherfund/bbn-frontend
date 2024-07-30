import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import {Route, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import { PaymentSheetComponent } from './payment-sheet/payment-sheet.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";

const routes: Route[] = [
  {path: '', component: AccountComponent}
]


@NgModule({
  declarations: [
    AccountComponent,
    PaymentSheetComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatBottomSheetModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
