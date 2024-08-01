import {Injectable} from '@angular/core';
import {UserResponse} from "../../models/user";
import {BehaviorSubject, catchError, filter, map, Observable, of, shareReplay, switchMap, tap, throwError} from 'rxjs';
import {UserApiService} from "./user-api.service";
import {LocalStorageService} from "../localstorage/local-storage.service";
import {Signup, SignupResponse} from "../../models/signup";
import {Login, LoginResponse} from "../../models/login";
import {Router} from "@angular/router";
import {UserBalance} from "../../models/bbn";
import {RechargeRequest} from "../../models/payment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: UserResponse = {} as UserResponse;
  userInitials: string = '';

  private currentUser$: BehaviorSubject<UserResponse | null> = new BehaviorSubject<UserResponse | null>(null);
  private loginSubject$ = new BehaviorSubject<number>(0);
  login$: Observable<number>;

  userCurrentBalance$: Observable<UserBalance>;
  totalBalance: number = 0;
  private userCurrentBalanceSubject$ = new BehaviorSubject<string>('');

  sidenavOpen: boolean = false;

  constructor(private readonly userApiService: UserApiService,
              private readonly router: Router,
              private _snackBar: MatSnackBar,
              private readonly stoarageService: LocalStorageService) {
    this.login$ = this.loginSubject$.asObservable();

    this.userCurrentBalance$ = this.userCurrentBalanceSubject$.pipe(
      filter(userId => !!userId),
      switchMap(userId => this.userApiService.getUserBalance(userId)),
      map(response => response?.data),
      tap(balance => {
        if (balance) {
          this.totalBalance = balance?.dwinBalance + balance.dcurBalance
        }
      }),
      shareReplay(1)
    );
  }

  get user(): UserResponse {
    return this._user;
  }

  set user(value: UserResponse) {
    this._user = value;
    this.userInitials = value.name.substring(0, 2) || value.email.substring(0, 2);
    this.loginSubject$.next(1);
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  loadUserBalance(userId: string) {
    this.userCurrentBalanceSubject$.next(userId);
  }

  rechargeUserAccount(rechargeRequest: RechargeRequest) {
    return this.userApiService.rechargeUserAccount(rechargeRequest);
  }

  checkTransactionStatus(reference: string) {
    return this.userApiService.checkStatus(reference);
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
          return of()
        })
      );
    } else {
      return of();
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
          return throwError(() => new Error(response?.message ? response.message : 'An error occurred'));
        }),
        catchError(error => {
          return throwError(error)
        })
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
      }),
      catchError(error => {
        return throwError(error)
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
    this.router.navigate(['/']);
  }

  checkIfUserExists(usernameOrEmailOrPhone: string): Observable<string> {
    return this.userApiService.checkIfUserExists(usernameOrEmailOrPhone)
      .pipe(
        map(response => response.data),
        catchError(error => throwError(error))
      );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar']
    });
  }

}
