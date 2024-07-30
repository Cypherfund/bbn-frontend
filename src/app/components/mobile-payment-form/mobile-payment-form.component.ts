import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PaymentMethod, RechargeRequest} from "../../models/payment";

@Component({
  selector: 'app-mobile-payment-form',
  templateUrl: './mobile-payment-form.component.html',
  styleUrl: './mobile-payment-form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class MobilePaymentFormComponent {
  @Input() paymentMethod!: PaymentMethod;
  @Input() paymentInProcess!: boolean;
  @Output() processPayment: EventEmitter<any> = new EventEmitter<any>();

  paymentForm!: FormGroup;
  successMsg: string = 'Confirm payment on your phone by dialing *126# and entering your pin.';

  constructor(fb: FormBuilder) {

    this.paymentForm = fb.group({
      phn: ['', [Validators.required, Validators.pattern('^6[0-9]{8}$')]],
      amount: ['', [Validators.required]],
      saveInfo: [false]
    });
  }

  makePayment() {
    console.log(this.paymentForm.value)
    if (this.paymentForm.valid) {
      const request: Partial<RechargeRequest> = {
        extra: JSON.stringify({...this.paymentForm.value}),
        paymentMethod: "MOBILE_WALLET",
        paymentCode: this.paymentMethod.strPaymentCode,
        amount: this.paymentForm.value.amount,
        reference: this.generateTransactionReference(),
      }
      console.log(request);
      this.processPayment.emit({request, msg: this.successMsg});
    }
  }

  generateTransactionReference() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  }
}
