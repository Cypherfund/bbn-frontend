import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BBNEvent, Bet, BetEvent, BetType, Outcome, PredictionRequest, TicketType} from "../../../models/bbn";
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
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-bet-summary-dialog',
  templateUrl: './bet-summary-dialog.component.html',
  styleUrl: './bet-summary-dialog.component.scss',
})
export class BetSummaryDialogComponent {
  bets: Bet[] = [];
  selectedOutcome$ = this.cartService.selectedOutcomes$;
  stake = 100;
  betsForm!: FormGroup;
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
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              private cartService: CartService) {
    this.betsForm = this.fb.group({
      bets: this.fb.array(this.bets.map(bet => this.createBetForm(bet)))
    });
    this.selectedOutcome$ = this.selectedOutcome$.pipe(
      tap(outcomes => {
        this.bets = this.createBets(outcomes);
        this.totalWinning = this.bets.reduce((acc, bet) => acc + bet.events.reduce((acc, event) => acc + event.odds * this.stake, 0), 0);
        this.eventDetails = this.gameService.eventDetails;
        this.stake = this.bets.length * 100;

        this.betsForm = this.fb.group({
          bets: this.fb.array(this.bets.map(bet => this.createBetForm(bet)))
        });

        this.stake = this.betsFormArray.controls.reduce((acc, control) => acc + control.value.amount, 0);
        this.cdr.detectChanges();
      })
    );

    this.paymentMethods$ = this.paymentService.providers$.pipe(
      tap(providers => this.selectedProvider = providers[0])
    );
  }
  get betsFormArray(): FormArray {
    return this.betsForm.get('bets') as FormArray;
  }

  createBetForm(bet: Bet): FormGroup {
    return this.fb.group({
      betType: [bet.betType],
      amount: [bet.amount],
      events: [bet.events]
    });
  }

  calculatePotentialWinning(bet: Bet): number {
    return bet.amount * bet.events.reduce((acc, event) => acc * event.odds, 1);
  }

  calculateTax(bet: Bet): number {
    return this.calculatePotentialWinning(bet) * 0.1; // 10% tax example
  }

  calculateBonus(bet: Bet): number {
    return bet.amount * 0.05; // 5% bonus example
  }


  private createBets(outcomes: Outcome[]): Bet[] {
    const groupedOutcomes = this.groupBy(outcomes, 'eventId');
    const combinations = this.generateCombinations(groupedOutcomes);

    return combinations.map((combination): Bet => {
      const events: BetEvent[] = combination.map((outcome): BetEvent => ({
        eventId: outcome.eventId,
        prediction: outcome.id, // Assuming prediction is the outcome id
        odds: outcome.odds,
      }));

      return {
        betType: events.length > 1 ? 'COMBINATION' : 'SINGLE',
        amount: this.stake,
        events,
      };
    });
  }

  private groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
    return array.reduce((result, item) => {
      const groupKey = item[key] as unknown as string;
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as { [key: string]: T[] });
  }

  private generateCombinations(groups: { [key: string]: Outcome[] }): Outcome[][] {
    const keys = Object.keys(groups);
    if (keys.length === 0) {
      return [];
    }

    function helper(index: number): Outcome[][] {
      if (index === keys.length) {
        return [[]];
      }

      const combinations = helper(index + 1);
      const results: Outcome[][] = [];

      for (const outcome of groups[keys[index]]) {
        for (const combination of combinations) {
          results.push([outcome, ...combination]);
        }
      }

      return results;
    }

    return helper(0);
  }

  removeBet(bet:any) {
    this.cartService.removeFromCart(bet.id);
  }

  validateBet() {
    const betType: BetType = this.bets.length === 1 ? "SINGLE" : "COMBINATION";
    const predictionRequest: PredictionRequest = {
      userId: this.userService.user.userId,
      ticketType: "ODDS",
      bets: this.bets
    };
    console.log(predictionRequest);

    this.msg = 'Bet Placed Successfully';
    this.openSnackBar();
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  printTickets(): void {
    window.print();
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
