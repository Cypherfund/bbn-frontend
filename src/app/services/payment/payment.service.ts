import {Injectable} from "@angular/core";
import {BehaviorSubject, filter, map, Observable, shareReplay, switchMap, tap} from "rxjs";
import {PaymentApiService} from "./payment-api.service";
import {PaymentMethod} from "../../models/payment";
import {APIResponse} from "../../models/user";

@Injectable()
export class PaymentService {

  providers$: Observable<PaymentMethod[]>;
  providerSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingPaymentMethod$: Observable<boolean>;
  loadingPaymentMethodSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private paymentApi: PaymentApiService) {
    this.providers$ = this.providerSubject$.pipe(
      filter(load => load),
      switchMap ( load => this.fetchPaymentMethods()
        .pipe(map(response => response.data || []))
      ),
      shareReplay(1)
    );

    this.loadingPaymentMethod$ = this.loadingPaymentMethodSubject$.asObservable();
  }

  fetchPaymentMethods(): Observable<APIResponse<PaymentMethod[]>>{
    this.loadingPaymentMethodSubject$.next(true);
    return this.paymentApi.getPaymentProviders().pipe(
      tap(data => this.loadingPaymentMethodSubject$.next(false))
    );
  }


}
