import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Outcome} from "../../../models/bbn";

@Component({
  selector: 'app-bet-summary-dialog',
  templateUrl: './bet-summary-dialog.component.html',
  styleUrl: './bet-summary-dialog.component.scss'
})
export class BetSummaryDialogComponent {
  bets = [
    { name: 'Phyna Phyna', odds: 1, amount: 500 },
    { name: 'Phyna Phyna', odds: 1, amount: 500 },
    { name: 'Phyna Phyna', odds: 1, amount: 500 }
  ];

  paymentMethods = [
    { name: 'Deduct Balance', icon: 'assets/deduct_balance.png' },
    { name: 'MTN MOMO', icon: 'assets/mtn_momo.png' },
    { name: 'ORANGE MOMO', icon: 'assets/orange_momo.png' }
  ];

  totalBet = this.bets.reduce((acc, bet) => acc + bet.amount, 0);

  constructor(public dialogRef: MatDialogRef<BetSummaryDialogComponent>) {}

  removeBet(bet:any) {
    this.bets = this.bets.filter(b => b !== bet);
    this.totalBet = this.bets.reduce((acc, bet) => acc + bet.amount, 0);
  }

  validateBet() {
    // Add your validation logic here
    this.dialogRef.close();
  }
}
