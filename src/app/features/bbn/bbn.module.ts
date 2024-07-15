import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BbnRoutingModule } from './bbn-routing.module';
import { BbnComponent } from './bbn.component';


@NgModule({
  declarations: [
    BbnComponent
  ],
  imports: [
    CommonModule,
    BbnRoutingModule
  ]
})
export class BbnModule { }
