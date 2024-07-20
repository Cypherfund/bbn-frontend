import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreatePlanRequest, PaymentMethod} from "../../../models/payment";
import {NgIf} from "@angular/common";
import {Plan} from "../../../models/qrcode";
import {UserService} from "../../../services/user/user.service";

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
  selectedPlan: Plan;

  constructor(fb: FormBuilder,
              private userService: UserService) {
    this.selectedPlan = this.userService.selectedPlan;

    this.paymentForm = fb.group({
      phn: ['', [Validators.required, Validators.pattern('^6[0-9]{8}$')]],
      saveInfo: [false]
    });
  }

  makePayment() {
    if (this.paymentForm.valid) {
      const request: Partial<CreatePlanRequest> = {
        extra: JSON.stringify({...this.paymentForm.value}),
        paymentMethod: "MOBILE_WALLET",
        paymentCode: this.paymentMethod.strPaymentCode
      }
      this.processPayment.emit({request, msg: this.successMsg});
    }
  }
}
