import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BBNEvent, Outcome} from "../../../models/bbn";
import {CartService} from "../../../services/cart.service";
import {tap} from "rxjs";
import {GamesService} from "../../../services/game/games.service";

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

  paymentMethods = [
    { name: 'Deduct Balance', icon: 'assets/deduct_balance.png' },
    { name: 'MTN MOMO', icon: 'assets/mtn_momo.png' },
    { name: 'ORANGE MOMO', icon: 'assets/orange_momo.png' }
  ];

  totalWinning!: number;

  constructor(public dialogRef: MatDialogRef<BetSummaryDialogComponent>,
              private gameService: GamesService,
              private cartService: CartService) {
    this.selectedOutcome$ = this.selectedOutcome$.pipe(
      tap(outcomes => {
        this.bets = outcomes;
        this.totalWinning = this.bets.reduce((acc, bet) => acc + bet.odds * this.stake, 0);
        this.eventDetails = this.gameService.eventDetails;
      })
    );
  }

  removeBet(bet:any) {
    this.cartService.removeFromCart(bet.id);
  }

  validateBet() {
    this.dialogRef.close();
  }
}
