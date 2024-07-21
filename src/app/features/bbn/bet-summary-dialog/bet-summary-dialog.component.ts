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
  MatSnackBar
} from "@angular/material/snack-bar";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SnackBarMessageBetComponent} from "./snack-bar-message-bet.component";

@Component({
  selector: 'app-bet-summary-dialog',
  templateUrl: './bet-summary-dialog.component.html',
  styleUrl: './bet-summary-dialog.component.scss',
})
export class BetSummaryDialogComponent {
  bets: Bet[] = [];
  selectedOutcome$ = this.cartService.selectedOutcomes$;
  totalStake = 0;
  betsForm!: FormGroup;
  eventDetails: Partial<BBNEvent> = {};

  selectedProvider!: PaymentMethod;
  paymentMethods$: Observable<PaymentMethod[]>;

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
        this.calculateAmounts(outcomes);
        this.cdr.detectChanges();
      })
    );

    this.paymentMethods$ = this.paymentService.providers$.pipe(
      tap(providers => this.selectedProvider = providers[0])
    );
  }

  calculateAmounts(outcomes: Outcome[]) {
    this.bets = this.createBets(outcomes);
    this.eventDetails = this.gameService.eventDetails;
    this.betsForm = this.fb.group({
      bets: this.fb.array(this.bets.map(bet => this.createBetForm(bet)))
    });

    this.totalStake = this.betsFormArray.controls.reduce((acc, control) => acc + control.value.amount, 0);
  }

  get betsFormArray(): FormArray {
    return this.betsForm.get('bets') as FormArray;
  }

  createBetForm(bet: Bet): FormGroup {
    return this.fb.group({
      betType: [bet.betType],
      amount: [bet.amount || 200],
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
        amount: 200, // Default stake amount example
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
    const predictionRequest: PredictionRequest = {
      userId: this.userService.user.userId,
      ticketType: "ODDS",
      bets: this.bets
    };
    console.log(predictionRequest);
    this.userService.showBlockLoader(true);
    this.userService.placeBet(predictionRequest).subscribe(
      {
        next: () => {
          this.msg = 'Bet Placed Successfully';
          this.cartService.clearCart();
          this.openSnackBar();
          this.dialogRef.close();
        },
        error: () => {
          this.msg = "failed to save bet";
          this.openSnackBar();
        }
      }
    ).add(() => this.userService.showBlockLoader(false));
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarMessageBetComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  printTickets(): void {
    window.print();
  }
}
