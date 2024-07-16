import { Injectable } from '@angular/core';
import {UserResponse} from "../../models/user";
import {BehaviorSubject, catchError, map, Observable, of, shareReplay, tap, throwError} from 'rxjs';
import {UserApiService} from "./user-api.service";
import {LocalStorageService} from "../localstorage/local-storage.service";
import {Signup, SignupResponse} from "../../models/signup";
import {Login, LoginResponse} from "../../models/login";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: UserResponse = {} as UserResponse;
  userInitials: string = '';

  private currentUser$: BehaviorSubject<UserResponse | null> = new BehaviorSubject<UserResponse | null>(null);
  private loginSubject$ = new BehaviorSubject<number>(0);
  login$: Observable<number>;

  //create a group of observables to manage showing header and footer
  private showHeader$ = new BehaviorSubject<boolean>(true);

  sidenavOpen: boolean = false;

  constructor(private readonly userApiService: UserApiService,
              private readonly router: Router,
              private readonly stoarageService: LocalStorageService) {
    this.login$ = this.loginSubject$.asObservable();
  }

  get user(): UserResponse {
    return this._user;
  }

  set user(value: UserResponse) {
    this._user = value;
    this.userInitials = value.name.substring(0,2) || value.email.substring(0,2);
    this.loginSubject$.next(1);
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  recheckToken(): Observable<any> {
    if (this.currentUser$.value) {
      return this.currentUser$.asObservable(); // Return cached user if available
    }
    const token = this.stoarageService.get('token');
    if (token) {
      return this.userApiService.verifyToken(token).pipe(
        tap(response => this.currentUser$.next(response.data)), // Cache the user data
        map(async response => {
          if (response.success) {
            this.stoarageService.set('token', token); // Consider security implications
            this.user = response.data;
            return response.data; // Return user data or a relevant part of the response
          } else {
            return of();
          }
        }),
        shareReplay(1),
        catchError(error => {
          return of ()
        })
      );
    } else {
      return of ();
    }
  }

  registerUser(userDetails: Signup): Observable<SignupResponse> {
    return this.userApiService.registerUser(userDetails)
      .pipe(
        tap(response => {
          if (response.success) {
            this.loginUser({usernameOrEmailOrPhone: userDetails.email, password: userDetails.password})
              .subscribe();
          }
        }),
        catchError(error => throwError(error))
      );
  }

  loginUser(userDetails: Login): Observable<LoginResponse> {
    return this.userApiService.LoginUser(userDetails).pipe(
      tap(response => {
        if (!!response.accessToken) {
          this.stoarageService.set('token', response.accessToken);
          this.recheckToken().pipe(
            tap(() => this.navigateToHome()),
            catchError(error => throwError(error))
          ).subscribe();

        }
      })
    );
  }

  logout() {
    this.stoarageService.clear();
    this.currentUser$.next(null);
    this.loginSubject$.next(0);
    this.router.navigate(['/']);
  }


  navigateToHome() {
    this.router.navigate(['/dashboard']);
  }
}
