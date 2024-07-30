import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {APIResponse, UserResponse} from "../../models/user";
import {Signup, SignupResponse} from "../../models/signup";
import {Login, LoginResponse} from "../../models/login";
import {environment} from "../../../environments/environment";
import {UserBalance} from "../../models/bbn";
import {RechargeRequest} from "../../models/payment";
import {LocalStorageService} from "../localstorage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl: string =  `${environment.apiUrl}/user-api/`
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }


  verifyToken(token: string): Observable<APIResponse<UserResponse>>{
    return this.http.post<any>(`${this.baseUrl}users/validate-token`, token).pipe(catchError(error=>throwError(error)));
  }

  registerUser(userDetails: Signup): Observable<SignupResponse>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SignupResponse>(`${this.baseUrl}signup`, userDetails, {headers}).pipe(catchError(error=>throwError(error)));
  }
  LoginUser(userDetails: Login): Observable<LoginResponse>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<LoginResponse>(`${this.baseUrl}signin`,
      userDetails, {headers}).pipe(catchError(error=>throwError(error)));
  }

  getUserBalance(userId: string): Observable<APIResponse<UserBalance>>{
    return this.http.get<APIResponse<UserBalance>>(`${this.baseUrl}account/balance/${userId}`).pipe(catchError(error=>throwError(error)));
  }

  checkIfUserExists(usernameOrEmailOrPhone: string): Observable<APIResponse<string>>{
    return this.http.get<APIResponse<string>>(`${this.baseUrl}users/valid/${usernameOrEmailOrPhone}`).pipe(catchError(error=>throwError(error)));
  }

  rechargeUserAccount(rechargeRequest: RechargeRequest): Observable<APIResponse<UserBalance>>{
    const headers = this.getHeadersWithAuthorization();
    headers.append('Content-Type', 'application/json');
    return this.http.post<APIResponse<UserBalance>>(`${this.baseUrl}account/deposit`, rechargeRequest, {headers}).pipe(catchError(error=>throwError(error)));
  }

  checkStatus(reference: string): Observable<APIResponse<string>>{
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<APIResponse<string>>(`${this.baseUrl}account/status?reference=${reference}`, {headers}).pipe(catchError(error=>throwError(error)));
  }

  private getHeadersWithAuthorization(): HttpHeaders {
    const token = this.localStorageService.get('token')
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }
}
