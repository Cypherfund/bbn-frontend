import { Component } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Observable, tap} from "rxjs";
import {PaymentMethod, RechargeRequest, SupportedMethod} from "../../../models/payment";
import {PaymentService} from "../../../services/payment/payment.service";
import {CryptoPaymentFormComponent} from "../../../components/crypto-payment-form/crypto-payment-form.component";
import {MobilePaymentFormComponent} from "../../../components/mobile-payment-form/mobile-payment-form.component";
import {CardPaymentFormComponent} from "../../../components/card-payment-form/card-payment-form.component";
import {PaypalPaymentFormComponent} from "../../../components/paypal-payment-form/paypal-payment-form.component";
import {UserService} from "../../../services/user/user.service";
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

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
    MatListModule
  ]
})
export class PaymentSheetComponent {
  paymentMethods$: Observable<PaymentMethod[]>;
  selectedProvider!: PaymentMethod;
  supportedMethods: Set<SupportedMethod> = new Set();

  selectedPaymentMethod: string = '';

  step = 0;

  constructor(public _bottomSheetRef: MatBottomSheetRef<PaymentSheetComponent>,
              private userService: UserService,
              private paymentService: PaymentService,) {
    this.paymentMethods$ = this.paymentService.providers$.pipe(
      tap(providers => {
        this.selectedProvider = providers[0];
        this.supportedMethods = new Set(providers.flatMap(provider => provider.supportedMethods))
      }));
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  makePayment(paymentPayload: any): void {
    this.subscribe(paymentPayload.request, paymentPayload.msg);
  }

  private subscribe(paymentPayload: RechargeRequest, msg: string) {
    paymentPayload.userId = this.userService.user.userId;
    this.userService.rechargeUserAccount(paymentPayload).subscribe({
      next: (apires) => {
        if (apires && apires.success) {
          let checkStatus = false;
          for (let i = 0; i < 6; i++) {
            if (checkStatus) break;
            setTimeout(() => {
              this.userService.checkTransactionStatus(paymentPayload.reference).subscribe({
                next: (status) => {
                  if (!!status && status.data === 'SUCCESS') {
                    this.userService.openSnackBar('Transaction successful');
                    this.userService.loadUserBalance(this.userService.user.userId);
                    checkStatus = true;
                  } else if (!!status && status.data === 'FAILED') {
                    this.userService.openSnackBar('Transaction failed. Please try again.');
                    checkStatus = true;
                  }
                }
              });
            }, 30000);
          }
        } else {
          this.userService.openSnackBar('Transaction failed. Please try again.');
        }
      },
      error: () => {
        this.userService.openSnackBar('Transaction failed. Please try again.');
      }
    });
  }
}
