import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BBNEvent, Category, Game, Tournament} from "../../models/bbn";

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  baseUrl: string =  `${environment.apiUrl}/bbn-api`

  constructor(private http: HttpClient) {}

  getActiveGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/admin/games`);
  }

  getCategories(gameId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/admin/games/${gameId}/categories`);
  }

  getTournaments(categoryId: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.baseUrl}/admin/categories/${categoryId}/tournaments`);
  }

  getEvents(tournamentId: number): Observable<BBNEvent[]> {
    return this.http.get<BBNEvent[]>(`${this.baseUrl}/tournaments/${tournamentId}/events`);
  }
}
