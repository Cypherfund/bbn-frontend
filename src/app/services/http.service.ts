import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {
  constructor(handler: HttpHandler, private localStorageService: LocalStorageService) {
    super(handler);
  }

  override get<T>(url: string, options?: any): Observable<T> {
    const headers = this.getHeadersWithAuthorization();
    url = `${environment.apiUrl}/${url}`;
    return super.get<T>(url, { ...options, headers }) as Observable<T>;
  }
   getAsset<T>(url: string): Observable<T> {
    return super.get<T>(url) as Observable<T>;
  }

  override post<T>(url: string, body: any, options?: any): Observable<T> {
    const headers = this.getHeadersWithAuthorization();
    url = `${environment.apiUrl}/${url}`;
    return super.post<T>(url, body, { ...options, headers }) as Observable<T>;
  }

  override put<T>(url: string, body: any, options?: any): Observable<T> {
    const headers = this.getHeadersWithAuthorization();
    url = `${environment.apiUrl}/${url}`;
    return super.put<T>(url, body, { ...options, headers }) as Observable<T>;
  }

  override delete<T>(url: string, options?: any): Observable<T> {
    const headers = this.getHeadersWithAuthorization();
    url = `${environment.apiUrl}/${url}`;
    return super.delete<T>(url, { ...options, headers }) as Observable<T>;
  }

  private getHeadersWithAuthorization(): HttpHeaders {
    const token = this.localStorageService.get('token')
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }
}
