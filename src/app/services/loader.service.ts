import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, distinctUntilChanged, finalize, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;
  constructor() {
    this.isLoading$ = this.isLoadingSubject.asObservable().pipe(distinctUntilChanged());
  }

  showLoaderUntilComplete<T>(observable: Observable<T>): Observable<T> {
    this.isLoadingSubject.next(true);
    return observable.pipe(
      tap(() => this.isLoadingSubject.next(false)),
      catchError((error) => {
        this.isLoadingSubject.next(false);
        throw error;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
