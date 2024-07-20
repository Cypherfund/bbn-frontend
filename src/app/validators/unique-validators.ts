import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import {Observable, of} from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import {UserService} from "../services/user/user.service";

export function usernameTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value =>
        userService.checkIfUserExists(value).pipe(
          map(data => {
            if (data === 'USER_EXISTS') {
              control.setErrors({ usernameTaken: true });
            }
            return (data === 'USER_EXISTS' ? { usernameTaken: true } : null);
          }),
          catchError(() => of(null))
        )
      )
    );
  };
}

export function emailTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value =>
        userService.checkIfUserExists(value).pipe(
          map(isTaken => {
            if (isTaken === 'USER_EXISTS') {
              control.setErrors({ emailTaken: true });
            }
            return (isTaken === 'USER_EXISTS' ? { emailTaken: true } : null);
          }),
          catchError(() => of(null))
        )
      )
    );
  };
}

export function phoneNumberTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value =>
        userService.checkIfUserExists(control.parent?.get('countryCode')?.value + value).pipe(
          map(data => {
            if (data === 'USER_EXISTS') {
              control.setErrors({ phoneNumberTaken: true });
            }
            return (data === 'USER_EXISTS' ? { phoneNumberTaken: true } : null);
          }),          catchError(() => of(null))
        )
      )
    );
  };
}

