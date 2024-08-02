import { Injectable } from '@angular/core';
import {GamesApiService} from "./games-api.service";
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {BBNEvent, BetTransaction, Outcome, PredictionRequest, Tournament, TransactionSearch} from "../../models/bbn";
import {LoaderService} from "../loader.service";
import {APIResponse} from "../../models/user";

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

  transactionHistory$: Observable<APIResponse<BetTransaction[]>>;
  transactionHistorySubject$: BehaviorSubject<TransactionSearch> = new BehaviorSubject<TransactionSearch>({userId: ''});

  constructor(private gamesApi: GamesApiService,
              private loaderService: LoaderService) {
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
      filter(searchCriteria => searchCriteria !== null  && searchCriteria.userId !== ''),
      switchMap(searchCriteria => this.loadTransactions(searchCriteria)),
      tap(transactions => transactions.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())),
      tap(transactions => transactions.data.map(transaction => {
        transaction.odds = transaction.betItems.reduce((acc, event) => acc * event.odds, 1);
        return transaction;
      })),
      shareReplay(1)
    );
    this.loaderService.showLoaderUntilComplete(this.transactionHistory$);
  }

  loadEvents() {
    this.eventSubject$.next(this.selectedTournament);
  }

  loadOutcomes(eventId: number) {
    this.outcomeSubject$.next(eventId);
  }

  loadTransactionHistory(search: TransactionSearch) {
    this.transactionHistorySubject$.next(search);
    this.loaderService.showLoaderUntilComplete(this.transactionHistory$);
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

  loadTransactions(search: TransactionSearch): Observable<APIResponse<BetTransaction[]>> {
    return this.gamesApi.userTransactions(search);
  }
}
