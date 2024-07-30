import { Component } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Observable, tap} from "rxjs";
import {PaymentMethod, SupportedMethod} from "../../../models/payment";
import {PaymentService} from "../../../services/payment/payment.service";

@Component({
  selector: 'app-payment-sheet',
  templateUrl: './payment-sheet.component.html',
  styleUrl: './payment-sheet.component.scss'
})
export class PaymentSheetComponent {
  paymentMethods$: Observable<PaymentMethod[]>;
  selectedProvider!: PaymentMethod;
  supportedMethods: Set<SupportedMethod> = new Set();

  constructor(public _bottomSheetRef: MatBottomSheetRef<PaymentSheetComponent>,
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
}
