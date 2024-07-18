import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BbnEventComponent} from "./bbn-event/bbn-event.component";
import {BbnComponent} from "./bbn.component";
import {OutcomeComponent} from "./outcome/outcome.component";

const routes: Routes = [
  {
    path: '',
    component: BbnComponent,
    children: [
      {
        path: '',
        redirectTo: 'event',
        pathMatch: 'full'
      },
      {
        path: 'event',
        component: BbnEventComponent
      },
      {
        path: 'event/:id',
        component: OutcomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BbnRoutingModule { }
