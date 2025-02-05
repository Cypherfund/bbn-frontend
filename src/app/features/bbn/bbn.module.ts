import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { BbnRoutingModule } from './bbn-routing.module';
import { BbnEventComponent } from './bbn-event/bbn-event.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {BbnComponent} from "./bbn.component";
import { OutcomeComponent } from './outcome/outcome.component';
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatBadgeModule} from "@angular/material/badge";
import {BetSummaryDialogComponent} from "./bet-summary-dialog/bet-summary-dialog.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    BbnEventComponent,
    BbnComponent,
    OutcomeComponent,
    BetSummaryDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BbnRoutingModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatRadioModule,
    MatDialogModule,
    NgOptimizedImage,
    MatProgressSpinnerModule
  ]
})
export class BbnModule { }
