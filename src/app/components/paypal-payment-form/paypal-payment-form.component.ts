import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreatePlanRequest, PaymentMethod} from "../../../models/payment";

@Component({
  selector: 'app-paypal-payment-form',
  templateUrl: './paypal-payment-form.component.html',
  styleUrl: './paypal-payment-form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class PaypalPaymentFormComponent {
  @Input() paymentMethod!: PaymentMethod;
  @Output() processPayment: EventEmitter<any> = new EventEmitter<any>();

  paymentForm: FormGroup;
  successMsg: string = 'Payment Successful';

  constructor(fb: FormBuilder) {
    this.paymentForm = fb.group({
      paypalEmail: ['', [Validators.required, Validators.email]]
    });
  }

  makePayment() {
    if (this.paymentForm.valid) {
      const request: Partial<CreatePlanRequest> = {
        extra: JSON.stringify({...this.paymentForm.value}),
        paymentMethod: "PAYPAL",
        paymentCode: this.paymentMethod.strPaymentCode
      }
      this.processPayment.emit({request, msg: this.successMsg});
    }
  }
}
