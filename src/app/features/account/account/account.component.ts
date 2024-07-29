import { Component } from '@angular/core';
import {TicketTransaction} from "../../../models/bbn";
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LoaderService} from "../../../services/loader.service";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [provideNativeDateAdapter()],
})
export class AccountComponent {
  selectedBetType = 'all';
  selectedPeriod = 'lastTwoWeeks';
  startDate!: Date;
  endDate!: Date;

  transactions$: Observable<TicketTransaction[]> = this.gamesService.transactionHistory$;

  constructor(public gamesService: GamesService,
              public loaderService: LoaderService,
              public userService: UserService) {
    this.transactions$ = this.loaderService.showLoaderUntilComplete(this.transactions$)
  }

  ngOnInit(): void {
    this.userService.login$.pipe().subscribe( loginVal => {
      if (loginVal === 1) {
        this.gamesService.loadTransactionHistory(this.userService.user.userId);
      }
    })
  }

  deposit(amount: number): void {
  }

  withdraw(amount: number): void {

  }


  search() {
    // Implement search functionality here
  }

  toggleDetails(transaction: TicketTransaction) {
    transaction.showDetails = !transaction.showDetails;
  }
}

