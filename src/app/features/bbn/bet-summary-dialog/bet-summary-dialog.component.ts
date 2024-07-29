import {ChangeDetectorRef, Component} from '@angular/core';
import {BBNEvent, Bet, BetEvent, Outcome} from "../../../models/bbn";
import {CartService} from "../../../services/cart.service";
import {Observable, tap} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import {PaymentService} from "../../../services/payment/payment.service";
import {PaymentMethod} from "../../../models/payment";
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {BetSummaryService} from "./bet-summary.service";

@Component({
  selector: 'app-bet-summary-dialog',
  templateUrl: './bet-summary-dialog.component.html',
  styleUrl: './bet-summary-dialog.component.scss',
  providers: [BetSummaryService]
})
export class BetSummaryDialogComponent {
  bets: Bet[] = [];
  selectedOutcome$ = this.cartService.selectedOutcomes$;
  totalStake = 0;
  betsForm!: FormGroup;
  selectedProvider!: PaymentMethod;
  paymentMethods$: Observable<PaymentMethod[]>;

  constructor(private paymentService: PaymentService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder,
              public userService: UserService,
              private betSummaryService: BetSummaryService,
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
    this.bets = this.betSummaryService.createBets(outcomes);
    this.betsForm = this.fb.group({
      bets: this.fb.array(this.bets.map(bet => this.createBetForm(bet)))
    });
    this.totalStake = this.betsFormArray.controls.reduce((acc, control) => acc + control.value.amount, 0);
  }

  upateAmounts(control: AbstractControl) {
    control.get('potentialWinning')?.setValue(this.calculatePotentialWinning(control.value));
    control.get('tax')?.setValue(this.calculateTax(control.value));
    control.get('bonus')?.setValue(this.calculateBonus(control.value));

    this.totalStake = this.betsFormArray.controls.reduce((acc, control) => acc + control.value.amount, 0);
  }

  decreaseStake(ticketIndex: number) {
    if (this.betsFormArray.controls[ticketIndex].value.amount > 200) {
      this.betsFormArray.controls[ticketIndex].value.amount -= 100;
      this.upateAmounts(this.betsFormArray.controls[ticketIndex])
    }
  }

  increaseStake(ticketIndex: number) {
    this.betsFormArray.controls[ticketIndex].value.amount += 100;
    this.upateAmounts(this.betsFormArray.controls[ticketIndex])
  }

  get betsFormArray(): FormArray {
    return this.betsForm.get('bets') as FormArray;
  }

  createBetForm(bet: Bet): FormGroup {
    return this.fb.group({
      betType: [bet.betType],
      amount: [bet.amount],
      events: [bet.events],
      potentialWinning: [this.calculatePotentialWinning(bet)],
      tax: [this.calculateTax(bet)],
      bonus: [this.calculateBonus(bet)]
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

  removeBet(event:BetEvent) {
    this.cartService.removeFromCart(event.prediction);
  }

  validateBet() {
    this.betSummaryService.validateBet(this.bets);
  }

  printTickets(): void {
    window.print();
  }
}
