import { Component } from '@angular/core';
import {TicketTransaction} from "../../../models/bbn";
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  accountBalance: number = 4840.12;
  transactions: TicketTransaction[] = [];
  expandedElement!: TicketTransaction | null;

  transactions$: Observable<TicketTransaction[]> = this.gamesService.transactionHistory$;

  constructor(public gamesService: GamesService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.login$.pipe().subscribe( loginVal => {
      if (loginVal === 1) {
        this.gamesService.loadTransactionHistory(this.userService.user.userId);
      }
    })
  }

  toggleRow(transaction: TicketTransaction): void {
    this.expandedElement = this.expandedElement === transaction ? null : transaction;
  }
  deposit(amount: number): void {
    this.accountBalance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
    } else {
      alert('Insufficient balance');
    }
  }
}
