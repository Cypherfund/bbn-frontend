import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyPipe, NgIf} from "@angular/common";
import {PaymentMethod, RechargeRequest} from "../../models/payment";

@Component({
  selector: 'app-mobile-payment-form',
  templateUrl: './mobile-payment-form.component.html',
  styleUrl: './mobile-payment-form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe
  ]
})
export class MobilePaymentFormComponent implements AfterViewInit{
  @Input() paymentMethod!: PaymentMethod;
  @Input() paymentInProcess!: boolean;
  @Input() data!: {action: string};
  @Output() processPayment: EventEmitter<any> = new EventEmitter<any>();

  paymentForm!: FormGroup;
  successMsg: string = 'Confirm payment on your phone by dialing *126# and entering your pin.';

  minAmount: number = 1;
  maxAmount: number = 1000;

  constructor(fb: FormBuilder) {

    this.paymentForm = fb.group({
      phn: ['', [Validators.required, Validators.pattern('^6[0-9]{8}$')]],
      amount: ['', [Validators.required]],
      saveInfo: [false]
    });
  }

  makePayment() {
    if (this.paymentForm.valid) {
      const request: Partial<RechargeRequest> = {
        extra: JSON.stringify({...this.paymentForm.value}),
        paymentMethod: "MOBILE_WALLET",
        paymentCode: this.paymentMethod.strPaymentCode,
        amount: this.paymentForm.value.amount,
        reference: this.generateTransactionReference(),
      }
      this.processPayment.emit({request, msg: this.successMsg});
    }
  }

  ngAfterViewInit() {

    if (!!this.data && this.data.action === 'deposit') {
      this.minAmount = this.paymentMethod.dbMinDepositAmount;
      this.maxAmount = this.paymentMethod.dbMaxDepositAmount;
    } else {
      this.minAmount = this.paymentMethod.dbMinWithdrawalAmount;
      this.maxAmount = this.paymentMethod.dbMaxWithdrawalAmount;
    }

    if (this.maxAmount)
      this.paymentForm.get('amount')?.addValidators([Validators.max(this.maxAmount)]);

    if (this.minAmount)
      this.paymentForm.get('amount')?.addValidators([Validators.min(this.minAmount)]);

    this.paymentForm.get('amount')?.updateValueAndValidity();
  }

  generateTransactionReference() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  }
}
