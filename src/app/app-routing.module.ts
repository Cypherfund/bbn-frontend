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
  {path: 'account', loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule)},
  {path: '', component: HomeComponent},
  { path: 'faq', loadChildren: () => import('./features/faq/faq.module').then(m => m.FaqModule) },
  { path: 'terms', loadChildren: () => import('./features/terms/terms.module').then(m => m.TermsModule) },
  { path: 'password', loadChildren: () => import('./features/profile/password/password.module').then(m => m.PasswordModule) },
  { path: 'notification', loadChildren: () => import('./features/notification/notification.module').then(m => m.NotificationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
