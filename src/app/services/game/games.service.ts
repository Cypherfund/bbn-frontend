import { Injectable } from '@angular/core';
import {GamesApiService} from "./games-api.service";
import {BehaviorSubject, filter, map, Observable, switchMap, tap} from "rxjs";
import {Tournament} from "../../models/bbn";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  topTournaments$: Observable<Tournament[]>;
  events$: Observable<Event[]>;
  eventSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  selectedTournament = 0;
  constructor(private gamesApi: GamesApiService) {
    this.topTournaments$ = this.loadTournamentsForFirstActiveGame();
    this.events$ = this.eventSubject$.pipe(
      filter(tournamentId => !!tournamentId),
      switchMap(tournamentId => this.gamesApi.getEvents(tournamentId)),
      tap(events => events.forEach(event => event.link = event.id))
    );
  }

  loadEvents() {
    this.eventSubject$.next(this.selectedTournament);
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
}
