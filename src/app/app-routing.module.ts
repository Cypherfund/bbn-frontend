import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {AboutComponent} from "./features/about/about.component";

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./features/signup/signup.module').then(m => m.SignupModule) },
  { path: 'bbn', loadChildren: () => import('./features/bbn/bbn.module').then(m => m.BbnModule) },
  {path: 'about', component: AboutComponent},
  {path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)},
  {path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
