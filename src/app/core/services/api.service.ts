// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL: string = 'http://localhost:3000';
  private readonly ACCESS_TOKEN_KEY: string = 'access_token'; // access token key name

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }> {
    const url = `${this.API_URL}/login`;
    const body = { username, password };
    return this.http.post<{ token: string }>(url, body).pipe(
      tap(response => this.setAccessToken(response.token)),
      catchError(this.handleError)
    );
  }

  signup(username: string, password: string, displayName: string, email: string): Observable<User> {
    const url = `${this.API_URL}/signup`;
    const body = { username, password, displayName, email };
    return this.http.post<User>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  getProfile(token: string): Observable<any> {
    const url = `${this.API_URL}/profile`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  logout(token: string): Observable<any> {
    const url = `${this.API_URL}/logout`;
    return this.http.post<any>(url, {}).pipe(
      tap(() => this.removeAccessToken()),
      catchError(this.handleError)
    );
  }

  getAccessToken(): string | null {
    //return localStorage.getItem('access_token');
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    //return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private setAccessToken(token: string): void {
    //localStorage.setItem('access_token', token);
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    //sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  private removeAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    //sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Caution: This contains sensitive information.
   *
   * @returns Returns all keycloak user data.
   */
  /** @deprecated Do not use in production.*/
  public getAllInfo(): any {
    return this.getUserInfo();
  }

  private handleError(error: any): Observable<never> {
    // Manejo de errores personalizado
    console.error('An error occurred', error);
    throw error;
  }

  /**
   * Caution: This contains sensitive information.
   *
   * @returns Returns all keycloak user data.
   */
  private getUserInfo(): any {
    const token = this.getAccessToken();
    let userInfo: any;

    if (token) {
      const payload = token.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      userInfo = payloadDecoded;
    }
    return userInfo;
  }
}
