import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {Outcome} from "../models/bbn";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private outcomeSelectedSubject = new BehaviorSubject<{ [key: number]: Outcome }>({});
  total$: Observable<number>;
  selectedOutcomes$: Observable<Outcome[]>;
  constructor(
    // private messageService: MessageService
  ) {

    this.selectedOutcomes$ = this.outcomeSelectedSubject.asObservable().pipe(
      map(outcomeObject => Object.values(outcomeObject)),
      tap(outcomes => localStorage.setItem('cart', JSON.stringify(outcomes))),
      catchError (err => of([]))
    );

    this.total$ = this.selectedOutcomes$.pipe(
      map(outcomes => outcomes.reduce((sum, outcome) => sum * outcome.odds, 0))
    );

  }

  addToCart(outcome: Outcome) {
    const currentoutcomes = this.outcomeSelectedSubject.getValue();
    if (!currentoutcomes[outcome.id]) {
      const updatedoutcomes = { ...currentoutcomes, [outcome.id]: outcome };
      this.outcomeSelectedSubject.next(updatedoutcomes);
    }
  }

  addoutcomes(outcomes: Outcome[]) {
    const currentoutcomes = this.outcomeSelectedSubject.getValue();
    const updatedoutcomes = { ...currentoutcomes };
    outcomes.forEach(outcome => {
      if (!currentoutcomes[outcome.id]) {
        updatedoutcomes[outcome.id] = outcome;
      }
    });
    this.outcomeSelectedSubject.next(updatedoutcomes);
  }

  removeFromCart(outcomeId: number) {
    const currentoutcomes = this.outcomeSelectedSubject.getValue();
    const updatedoutcomes = { ...currentoutcomes };
    delete updatedoutcomes[outcomeId];
    this.outcomeSelectedSubject.next(updatedoutcomes);
  }

  clearCart() {
    this.outcomeSelectedSubject.next({});
  }
}
