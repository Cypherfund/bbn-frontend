import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  userCoins: number = 0;

  followUser() {
    this.userCoins += 4;
  }
  headerLeftIcon$: Observable<String>;
  headerLeftIconSubscription$: BehaviorSubject<String> = new BehaviorSubject<String>('account_circle');

  headerTitle$: Observable<String>;
  headerTitleSubscription$: BehaviorSubject<String> = new BehaviorSubject<String>('Earn Coins');
  constructor() {
    this.headerLeftIcon$ = this.headerLeftIconSubscription$.asObservable();
    this.headerTitle$ = this.headerTitleSubscription$.asObservable();
  }

  showAccountIcon(){
    this.headerLeftIconSubscription$.next('account_circle');
  }

  showBackIcon(){
    this.headerLeftIconSubscription$.next('arrow_back');
  }

  setHeaderTitle(title: String){
    this.headerTitleSubscription$.next(title);
  }

  resetHeaderLeftIcon(){
    this.headerLeftIconSubscription$.next('account_circle');
  }
}
