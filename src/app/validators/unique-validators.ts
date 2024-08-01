import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import {distinctUntilChanged, finalize, Observable, of, take, tap} from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import {UserService} from "../services/user/user.service";

export function usernameTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.valueChanges || control.pristine) {
      return of(null);
    }
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      take(1),
      switchMap(value => {
        return userService.checkIfUserExists(control.value).pipe(
          map(isTaken => isTaken === 'USER_EXISTS' ? { usernameTaken: true } : null),
          catchError(() => of(null)), // Handle errors gracefully
        );
      })
    );
  };
}

export function emailTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.valueChanges || control.pristine) {
      return of(null);
    }
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      take(1),
      switchMap(value => {
        return userService.checkIfUserExists(control.value).pipe(
          map(isTaken => isTaken === 'USER_EXISTS' ? { emailTaken: true } : null),
          catchError(() => of(null)), // Handle errors gracefully
        );
      })
    );
  };
}

export function phoneNumberTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.valueChanges || control.pristine) {
      return of(null);
    }
    const countryControl = control.parent?.get('countryCode');
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      take(1),
      switchMap(value => {
        if (!value || !countryControl?.value) {
          return of(null);
        }
        const combinedValue = countryControl.value + value;
        return userService.checkIfUserExists(combinedValue).pipe(
          map(isTaken => isTaken === 'USER_EXISTS' ? { phoneNumberTaken: true } : null),
          catchError(() => of(null)), // Handle errors gracefully
        );
      })
    );
  };
}

