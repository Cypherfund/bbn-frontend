import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BetSummaryDialogComponent} from "../bet-summary-dialog/bet-summary-dialog.component";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrl: './outcome.component.scss'
})
export class OutcomeComponent {
  participants = [
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' },
    { name: 'Phyna', image: 'assets/participant1.jpg' }
  ];

  constructor(public dialog: MatDialog) {}

  openBetSummaryDialog() {
    this.dialog.open(BetSummaryDialogComponent, {
      width: '600px'
    });
  }
}
