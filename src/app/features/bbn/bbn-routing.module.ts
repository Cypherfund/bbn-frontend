import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BbnComponent } from './bbn.component';

const routes: Routes = [{ path: '', component: BbnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BbnRoutingModule { }
