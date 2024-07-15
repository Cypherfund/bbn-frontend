import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {APIResponse, UserResponse} from "../../models/user";
import {Signup, SignupResponse} from "../../models/signup";
import {Login, LoginResponse} from "../../models/login";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl: string =  `${environment.apiUrl}/user-api/`
  constructor(private http: HttpClient) { }


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
}
