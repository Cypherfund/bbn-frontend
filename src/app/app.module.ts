import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./services/user/user.service";
import {UserApiService} from "./services/user/user-api.service";
import {LocalStorageService} from "./services/localstorage/local-storage.service";
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CampaignCardComponent } from './features/home/components/campaign-card/campaign-card.component';
import { EarningsComponent } from './features/home/components/earnings/earnings.component';
import { HomeCarouselComponent } from './features/home/components/home-carousel/home-carousel.component';
import {MatButton, MatIconButton} from "@angular/material/button";
import { TaskCenterComponent } from './features/home/components/task-center/task-center.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CampaignCardComponent,
    EarningsComponent,
    HomeCarouselComponent,
    TaskCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton,
    MatIconButton
  ],
  providers: [
    provideClientHydration(),
    UserService,
    UserApiService,
    LocalStorageService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
