import { Injectable } from '@angular/core';
import {GamesApiService} from "./games-api.service";
import {BehaviorSubject, catchError, filter, map, Observable, shareReplay, switchMap, tap, throwError} from "rxjs";
import {BBNEvent, Outcome, PredictionRequest, TicketTransaction, Tournament} from "../../models/bbn";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  topTournaments$: Observable<Tournament[]>;

  events$: Observable<BBNEvent[]>;
  eventSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  outcomes$: Observable<Outcome[]>;
  outcomeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  selectedTournament = 0;
  eventDetails!: BBNEvent;

  transactionHistory$: Observable<TicketTransaction[]>;
  transactionHistorySubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private gamesApi: GamesApiService) {
    this.topTournaments$ = this.loadTournamentsForFirstActiveGame();

    this.events$ = this.eventSubject$.pipe(
      filter(tournamentId => !!tournamentId),
      switchMap(tournamentId => this.gamesApi.getEvents(tournamentId)),
      tap(events => events.forEach(event => event.link = event.id.toString()))
    );

    this.outcomes$ = this.outcomeSubject$.pipe(
      filter(eventId => !!eventId),
      //perform conditional loading of event details if not already loaded
      switchMap(eventId => {
        if (!this.eventDetails || this.eventDetails.id !== eventId) {
          return this.gamesApi.getEventDetails(eventId).pipe(
            tap(eventDetails => this.eventDetails = eventDetails),
            switchMap(() => this.gamesApi.getOutcomes(eventId))
          );
        }
        return this.gamesApi.getOutcomes(eventId);
      })
    );

    this.transactionHistory$ = this.transactionHistorySubject$.pipe(
      filter(userId => !!userId),
      switchMap(userId => this.loadTransactions(userId)),
      tap(transactions => console.log(transactions)),
      shareReplay(1)
    );
  }

  loadEvents() {
    this.eventSubject$.next(this.selectedTournament);
  }

  loadOutcomes(eventId: number) {
    this.outcomeSubject$.next(eventId);
  }

  loadTransactionHistory(userId: string) {
    this.transactionHistorySubject$.next(userId);
  }

  loadTournamentsForFirstActiveGame(): Observable<Tournament[]> {
    return this.gamesApi.getActiveGames().pipe(
      map(games => games.find(game => game.status === 'ACTIVE' || game.status === null)),
      switchMap(activeGame => this.gamesApi.getCategories(activeGame?.id || 0)),
      map(categories => categories.find(category => category.id === 2)), //todo fix
      switchMap(category => this.gamesApi.getTournaments(category?.id || 0)),
      tap(tournaments => tournaments.forEach(el => this.addLink(el)))
    );
  }

  addLink(tournament: Tournament): Tournament {
    tournament.link = '/bbn';
    return tournament
  }

  placeBet(predictionRequest: PredictionRequest): Observable<void> {
    return this.gamesApi.placeBet(predictionRequest)
      .pipe(
        map(() => {}),
        catchError(error => throwError(error))
      );
  }

  loadTransactions(userId: string): Observable<TicketTransaction[]> {
    return this.gamesApi.userTransactions(userId);
  }
}
