import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {BBNEvent, Category, Game, Outcome, PredictionRequest, TicketTransaction, Tournament} from "../../models/bbn";
import {APIResponse} from "../../models/user";
import {LocalStorageService} from "../localstorage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  baseUrl: string =  `${environment.apiUrl}/bbn-api`

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {}

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
    return this.http.get<BBNEvent[]>(`${this.baseUrl}/admin/tournaments/${tournamentId}/events`);
  }

  getEventDetails(eventId: number): Observable<BBNEvent> {
    return this.http.get<BBNEvent>(`${this.baseUrl}/admin/events/${eventId}`);

  }

  getOutcomes(eventId: number): Observable<Outcome[]> {
    return this.http.get<Outcome[]>(`${this.baseUrl}/admin/events/${eventId}/outcomes`);
  }

  placeBet(predictionRequest: PredictionRequest): Observable<APIResponse<void>>{
    const headers = this.getHeadersWithAuthorization();
    headers.append('Content-Type', 'application/json');
    return this.http.post<APIResponse<any>>(`${this.baseUrl}/bets`, predictionRequest, {headers}).pipe(catchError(error=>throwError(error)));
  }

  userTransactions(userId: string): Observable<TicketTransaction[]>{
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<TicketTransaction[]>(`${this.baseUrl}/bets/tickets/${userId}`, {headers}).pipe(catchError(error=>throwError(error)));
  }

  private getHeadersWithAuthorization(): HttpHeaders {
    const token = this.localStorageService.get('token')
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }
}
