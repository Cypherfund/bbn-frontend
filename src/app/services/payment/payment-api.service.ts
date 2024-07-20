import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {APIResponse} from "../../models/user";
import {PaymentMethod} from "../../models/payment";

@Injectable()
export class PaymentApiService {
  baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }


  getPaymentProviders(): Observable<APIResponse<PaymentMethod[]>>{
    return this.http.get<any>(`${this.baseUrl}/payment-api/payment/providers/cmr`).pipe(catchError(error=>throwError(error)));
  }

}
