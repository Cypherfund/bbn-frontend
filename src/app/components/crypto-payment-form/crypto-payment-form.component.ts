import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreatePlanRequest, PaymentMethod} from "../../../models/payment";

@Component({
  selector: 'app-crypto-payment-form',
  templateUrl: './crypto-payment-form.component.html',
  styleUrl: './crypto-payment-form.component.scss',
  standalone: true
})
export class CryptoPaymentFormComponent {
  @Input() paymentMethod!: PaymentMethod;
  @Output() processPayment: EventEmitter<any> = new EventEmitter<any>();

  paymentForm!: FormGroup;

  successMsg: string = 'Payment Successful';

  constructor(fb: FormBuilder) {
    this.paymentForm = fb.group({
      address: ['', [Validators.required]]
    });
  }

  makePayment() {
    if (this.paymentForm.valid) {
      const request: Partial<CreatePlanRequest> = {
        extra: JSON.stringify({...this.paymentForm.value}),
        paymentMethod: "CRYPTO",
        paymentCode: this.paymentMethod.strPaymentCode
      }
      console.log(request);
      this.processPayment.emit({request, msg: this.successMsg});
    }
  }
}
