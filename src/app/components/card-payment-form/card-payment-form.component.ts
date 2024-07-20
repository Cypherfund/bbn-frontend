import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreatePlanRequest, PaymentMethod} from "../../../models/payment";

@Component({
  selector: 'app-card-payment-form',
  templateUrl: './card-payment-form.component.html',
  styleUrl: './card-payment-form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class CardPaymentFormComponent {
  @Input() paymentMethod!: PaymentMethod;
  @Output() processPayment: EventEmitter<any> = new EventEmitter<any>();

  paymentForm!: FormGroup;

  successMsg: string = 'Payment Successful';

  constructor(fb: FormBuilder) {
    this.paymentForm = fb.group({
      name: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      saveInfo: [false]
    });
  }

  makePayment() {
    if (this.paymentForm.valid) {
      const request: Partial<CreatePlanRequest> = {
        extra: JSON.stringify({...this.paymentForm.value}),
        paymentMethod: "CREDIT_CARD",
        paymentCode: this.paymentMethod.strPaymentCode
      }
      console.log(request);
      this.processPayment.emit({request, msg: this.successMsg});
    }
  }
}
