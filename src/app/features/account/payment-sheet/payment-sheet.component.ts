import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Observable, tap} from "rxjs";
import {PaymentMethod, RechargeRequest, SupportedMethod} from "../../../models/payment";
import {PaymentService} from "../../../services/payment/payment.service";
import {CryptoPaymentFormComponent} from "../../../components/crypto-payment-form/crypto-payment-form.component";
import {MobilePaymentFormComponent} from "../../../components/mobile-payment-form/mobile-payment-form.component";
import {CardPaymentFormComponent} from "../../../components/card-payment-form/card-payment-form.component";
import {PaypalPaymentFormComponent} from "../../../components/paypal-payment-form/paypal-payment-form.component";
import {UserService} from "../../../services/user/user.service";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-payment-sheet',
  templateUrl: './payment-sheet.component.html',
  styleUrl: './payment-sheet.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    AsyncPipe,
    CryptoPaymentFormComponent,
    MobilePaymentFormComponent,
    CardPaymentFormComponent,
    PaypalPaymentFormComponent,
    MatIconModule,
    MatListModule,
    MatFormFieldModule
  ]
})
export class PaymentSheetComponent {
  paymentMethods$: Observable<PaymentMethod[]>;
  selectedProvider!: PaymentMethod;
  supportedMethods: Set<SupportedMethod> = new Set();
  selectedPaymentMethod: string = '';

  loading: boolean = false;

  msg: string = '';
  errorMsg: string = '';

  step = 0;

  readonly dialog = inject(MatDialog);

  constructor(public _bottomSheetRef: MatBottomSheetRef<PaymentSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {action: string},
              private userService: UserService,
              private paymentService: PaymentService,) {
    this.paymentMethods$ = this.paymentService.providers$.pipe(
      tap(providers => {
        this.selectedProvider = providers[0];
        this.supportedMethods = new Set(providers.flatMap(provider => provider.supportedMethods))
      }));
  }

  makePayment(paymentPayload: any): void {
    this.subscribe(paymentPayload.request, paymentPayload.msg);
  }

  private subscribe(paymentPayload: RechargeRequest, msg: string) {
    paymentPayload.userId = this.userService.user.userId;
    this.loading = true;
    this.msg = 'Processing payment...';
    this.userService.rechargeUserAccount(paymentPayload).subscribe({
      next: (apires) => {
        if (apires && apires.success) {
          let attemptCount = 0;
          const maxAttempts = 36;
          this.msg = msg;
          const intervalId = setInterval(async () => {
            attemptCount++;
            await this.userService.checkTransactionStatus(paymentPayload.reference).subscribe({
              next: (status) => {
                if (!!status && status.data === 'SUCCESS') {
                  this.userService.openSnackBar('Transaction successful');
                  this.userService.loadUserBalance(this.userService.user.userId);
                  clearInterval(intervalId);
                  this.loading = false;
                  this.openDialog();
                  this._bottomSheetRef.dismiss();
                } else if (!!status && status.data === 'FAILED') {
                  this.userService.openSnackBar('Transaction failed. Please try again.');
                  clearInterval(intervalId);
                  this.errorMsg = 'Transaction failed. Please try again.';
                  this.loading = false;
                }
              }
            });
            if (attemptCount >= maxAttempts) {
              clearInterval(intervalId);
              this.loading = false;
              this.errorMsg = 'Transaction failed. Please try again.';
              this.userService.openSnackBar('Transaction failed. Please try again.');
            }

          }, 5000);
        } else {
          this.loading = false;
          this.errorMsg = 'Transaction failed. Please try again.';
          this.userService.openSnackBar('Transaction failed. Please try again.');
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Transaction failed. Please try again.';
        this.userService.openSnackBar('Transaction failed. Please try again.');
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <div class="flex justify-content-end align-items-center">
      <mat-icon class="close-icon" mat-dialog-close>close</mat-icon>
    </div>
    <img src="assets/payments/success.gif"/>
    <div class="flex justify-content-center align-items-center">
      <h1 mat-dialog-title style="font-size: 1.5em; color: #44d295">Payment Successful</h1>
    </div>
  `,
  styles: `
  ::ng-deep .mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface{
    padding: 35px;
  }
  `,
  standalone: true,
  imports: [MatIconModule, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}
