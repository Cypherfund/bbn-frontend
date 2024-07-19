import { Injectable } from '@angular/core';
import {GamesApiService} from "./games-api.service";
import {map, Observable, switchMap} from "rxjs";
import {Tournament} from "../../models/bbn";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  topTournaments$: Observable<Tournament[]>;
  constructor(private gamesApi: GamesApiService) {
    this.topTournaments$ = this.loadTournamentsForFirstActiveGame();
  }

  loadTournamentsForFirstActiveGame(): Observable<Tournament[]> {
    return this.gamesApi.getActiveGames().pipe(
      map(games => games.find(game => game.status === 'ACTIVE' || game.status === null)),
      switchMap(activeGame => this.gamesApi.getCategories(activeGame?.id || 0)),
      map(categories => categories.find(category => category.id === 2)), //todo fix
      switchMap(category => this.gamesApi.getTournaments(category?.id || 0))
    );
  }
}
