import {Component, inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BBNEvent, Outcome} from "../../../models/bbn";
import {CartService} from "../../../services/cart.service";
import {Observable, tap} from "rxjs";
import {GamesService} from "../../../services/game/games.service";
import {UserService} from "../../../services/user/user.service";
import {PaymentService} from "../../../services/payment/payment.service";
import {PaymentMethod} from "../../../models/payment";
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";

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
  durationInSeconds = 5;
  msg: string = '';

  constructor(public dialogRef: MatDialogRef<BetSummaryDialogComponent>,
              private gameService: GamesService,
              public userService: UserService,
              private paymentService: PaymentService,
              private _snackBar: MatSnackBar,
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
    this.msg = 'Bet Placed Successfully';
    this.openSnackBar();
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  template: `
    <span class="example-pizza-party" matSnackBarLabel>
  Bet placed successfuly!!!
</span>
    <span matSnackBarActions>
  <button mat-button matSnackBarAction (click)="snackBarRef.dismissWithAction()">🍕</button>
</span>


  `,
  styles: `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
