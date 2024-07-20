import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BBNEvent, Outcome} from "../../../models/bbn";
import {CartService} from "../../../services/cart.service";
import {Observable, tap} from "rxjs";
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {PaymentService} from "../../../services/payment/payment.service";
import {PaymentMethod} from "../../../models/payment";

@Component({
  selector: 'app-bet-summary-dialog',
  templateUrl: './bet-summary-dialog.component.html',
  styleUrl: './bet-summary-dialog.component.scss'
})
export class BetSummaryDialogComponent {
  bets: Outcome[] = [];
  selectedOutcome$ = this.cartService.selectedOutcomes$;
  stake = 100;
  eventDetails: Partial<BBNEvent> = {};

  selectedProvider!: PaymentMethod;
  paymentMethods$: Observable<PaymentMethod[]>;

  totalWinning!: number;

  constructor(public dialogRef: MatDialogRef<BetSummaryDialogComponent>,
              private gameService: GamesService,
              public userService: UserService,
              private paymentService: PaymentService,
              private cartService: CartService) {
    this.selectedOutcome$ = this.selectedOutcome$.pipe(
      tap(outcomes => {
        this.bets = outcomes;
        this.totalWinning = this.bets.reduce((acc, bet) => acc + bet.odds * this.stake, 0);
        this.eventDetails = this.gameService.eventDetails;
      })
    );

    this.paymentMethods$ = this.paymentService.providers$.pipe(
      tap (providers => this.selectedProvider = providers[0])
    );
  }

  removeBet(bet:any) {
    this.cartService.removeFromCart(bet.id);
  }

  validateBet() {
    this.dialogRef.close();
  }
}
